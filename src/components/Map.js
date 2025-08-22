// src/components/Map.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import postsData from '../data/postsData';
import '../styles/Map.css';

// マーカーデフォルトアイコン設定
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function Map() {
  const [groupedLocations, setGroupedLocations] = useState({});
  const [filteredGroups, setFilteredGroups] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [popupIndexes, setPopupIndexes] = useState({});

  useEffect(() => {
    const fetchLocations = async () => {
      const geocodeCache = {};

      const promises = postsData.map(async (post) => {
        if (!post.spot) return null;

        if (geocodeCache[post.spot]) {
          return { ...geocodeCache[post.spot], ...post };
        }

        try {
          const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
              q: post.spot,
              format: 'json',
              limit: 1,
            },
          });

          const data = response.data[0];
          if (data) {
            const loc = {
              lat: parseFloat(data.lat),
              lon: parseFloat(data.lon),
              spot: post.spot,
            };
            geocodeCache[post.spot] = loc;
            return { ...loc, ...post };
          }
        } catch (err) {
          console.error('Location fetch failed:', err);
        }

        return null;
      });

      const results = await Promise.all(promises);
      const validLocations = results.filter(loc => loc !== null);

      const grouped = {};
      validLocations.forEach((loc) => {
        const key = `${loc.lat},${loc.lon}`;
        if (!grouped[key]) {
          grouped[key] = {
            lat: loc.lat,
            lon: loc.lon,
            spot: loc.spot,
            posts: [],
          };
        }
        grouped[key].posts.push({
          fish: loc.fish,
          bait: loc.bait,
          date: loc.date,
        });
      });

      setGroupedLocations(grouped);
      setFilteredGroups(grouped);
    };

    fetchLocations();
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredGroups(groupedLocations);
      setNotFound(false);
      return;
    }

    const filtered = Object.fromEntries(
      Object.entries(groupedLocations).filter(([_, value]) =>
        value.spot.includes(searchTerm.trim())
      )
    );

    setFilteredGroups(filtered);
    setNotFound(Object.keys(filtered).length === 0);
  };

  const handleSlide = (key, direction) => {
    setPopupIndexes((prev) => {
      const current = prev[key] || 0;
      const postsLength = filteredGroups[key].posts.length;
      const next = direction === 'next'
        ? (current + 1) % postsLength
        : (current - 1 + postsLength) % postsLength;
      return { ...prev, [key]: next };
    });
  };

  return (
    <div className="map-container">
      {/* 🔍 検索バー */}
      <div className="search-bar">
        {searchActive && (
          <>
            <input
              type="text"
              placeholder="場所を入力（例：大阪湾）"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <button onClick={handleSearch}>検索</button>
          </>
        )}
        <span
          className="material-symbols-outlined search-icon"
          onClick={() => setSearchActive(!searchActive)}
        >
          search
        </span>
      </div>

      {/* 🗺️ Map */}
      <MapContainer
        center={[35.0, 135.0]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: 'calc(100vh - 60px)', marginTop: '55px' }}
        zoomControl={false} // ➖ ズームコントロール右上に移動させるため false に設定
      >
        <ZoomControl position="topright" /> {/* ➕ 右上にズームボタン表示 */}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {Object.entries(filteredGroups).map(([key, group], index) => {
          const currentIndex = popupIndexes[key] || 0;
          const currentPost = group.posts[currentIndex];

          return (
            <Marker key={index} position={[group.lat, group.lon]}>
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <b>{group.spot}</b><br />
                  🗓️{currentPost.date}<br />
                  魚種： {currentPost.fish}<br />
                  仕掛け： {currentPost.bait}<br />
                  <div style={{ marginTop: '4px' }}>
                    <button onClick={() => handleSlide(key, 'prev')}>◀</button>
                    <span style={{ margin: '0 8px' }}>{currentIndex + 1} / {group.posts.length}</span>
                    <button onClick={() => handleSlide(key, 'next')}>▶</button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {notFound && (
        <div className="no-results">検索結果が見つかりませんでした。</div>
      )}
    </div>
  );
}

export default Map;