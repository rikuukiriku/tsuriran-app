// FishCatalog.js
import React, { useState } from 'react';
import '../styles/FishCatalog.css';

const allFishSpecies = [
  { name: 'アジ', category: '海', src: '/images/fish_aji.png', caught: false },
  { name: 'タイ', category: '海', src: '/images/fish_tai.png', caught: false },
  { name: 'サバ', category: '海', src: '/images/fish_saba.png', caught: false },
  { name: 'カサゴ', category: '海', src: '/images/fish_kasago.png', caught: false },
  { name: 'ブリ', category: '海', src: '/images/fish_buri.png', caught: false },
  { name: 'ヒラメ', category: '海', src: '/images/fish_hirame.png', caught: false },
  { name: 'タチウオ', category: '海', src: '/images/fish_tachiuo.png', caught: false },
  { name: 'カレイ', category: '海', src: '/images/fish_karei.png', caught: false },
  { name: 'イカ', category: '海', src: '/images/fish_ika.png', caught: false },
  { name: 'タコ', category: '海', src: '/images/fish_tako.png', caught: false },
  { name: 'スズキ', category: '海', src: '/images/fish_suzuki.png', caught: false },
  { name: 'メバル', category: '海', src: '/images/fish_mebaru.png', caught: false },
  { name: 'アナゴ', category: '海', src: '/images/fish_anago.png', caught: false },
  { name: 'クロダイ', category: '海', src: '/images/fish_kurodai.png', caught: false },
  { name: 'シマアジ', category: '海', src: '/images/fish_shimaaji.png', caught: false },
  { name: 'クエ', category: '海', src: '/images/fish_kue.png', caught: false },
  { name: 'マグロ', category: '海', src: '/images/fish_kuromaguro.png', caught: false },
  { name: 'キハダマグロ', category: '海', src: '/images/fish_kihadamaguro.png', caught: false },
  { name: 'サンマ', category: '海', src: '/images/fish_sanma.png', caught: false },
  { name: 'カワハギ', category: '海', src: '/images/fish_kawahagi.png', caught: false },
  { name: 'アマダイ', category: '海', src: '/images/fish_amadai.png', caught: false },
  { name: 'アカムツ', category: '海', src: '/images/fish_akamutu.png', caught: false },
  { name: 'ホウボウ', category: '海', src: '/images/fish_houbou.png', caught: false },
  { name: 'キス', category: '海', src: '/images/fish_kisu.png', caught: false },
  { name: 'アオリイカ', category: '海', src: '/images/fish_aoriika.png', caught: false },
  { name: 'サケ', category: '海', src: '/images/fish_sake.png', caught: false },
  { name: 'イワシ', category: '海', src: '/images/fish_iwashi.png', caught: false },
  { name: 'フグ', category: '海', src: '/images/fish_fugu.png', caught: false },
  { name: 'マンボウ', category: '海', src: '/images/fish_manbou.png', caught: false },
  { name: 'エビ', category: '海', src: '/images/fish_ebi.png', caught: false },
  { name: 'カニ', category: '海', src: '/images/fish_kani.png', caught: false },
  { name: 'キダイ', category: '海', src: '/images/fish_kidai.png', caught: false },
  { name: 'イシダイ', category: '海', src: '/images/fish_ishidai.png', caught: false },
  { name: 'チダイ', category: '海', src: '/images/fish_tidai.png', caught: false },
  { name: 'イシガキダイ', category: '海', src: '/images/fish_ishigakidai.png', caught: false },
  { name: 'ヘダイ', category: '海', src: '/images/fish_hedai.png', caught: false },
  { name: 'キビレ', category: '海', src: '/images/fish_kibire.png', caught: false },
  { name: 'ハマフエフキ', category: '海', src: '/images/fish_hamafuefuki.png', caught: false },
  { name: 'カンパチ', category: '海', src: '/images/fish_kanpachi.png', caught: false },
  { name: 'ヒラマサ', category: '海', src: '/images/fish_hiramasa.png', caught: false },
  { name: 'カツオ', category: '海', src: '/images/fish_katsuo.png', caught: false },
  { name: 'マハタ', category: '海', src: '/images/fish_mahata.png', caught: false },
  { name: 'キジハタ', category: '海', src: '/images/fish_kizihata.png', caught: false },
  { name: 'アカハタ', category: '海', src: '/images/fish_akahata.png', caught: false },
  { name: 'アオハタ', category: '海', src: '/images/fish_aohata.png', caught: false },
  { name: 'スジアラ', category: '海', src: '/images/fish_suziara.png', caught: false },
  { name: 'バラハタ', category: '海', src: '/images/fish_barahata.png', caught: false },
  { name: 'クロソイ', category: '海', src: '/images/fish_kurosoi.png', caught: false },
  { name: 'ムラソイ', category: '海', src: '/images/fish_murasoi.png', caught: false },
  { name: 'マゾイ', category: '海', src: '/images/fish_mazoi.png', caught: false },
  { name: 'ゴマソイ', category: '海', src: '/images/fish_gomasoi.png', caught: false },
  { name: 'シマソイ', category: '海', src: '/images/fish_shimasoi.png', caught: false },
  { name: 'ボラ', category: '海', src: '/images/fish_bora.png', caught: false },
  { name: 'トビウオ', category: '海', src: '/images/fish_tobiuo.png', caught: false },
  { name: 'イサキ', category: '海', src: '/images/fish_isaki.png', caught: false },
  { name: 'サワラ', category: '海', src: '/images/fish_sawara.png', caught: false },
  { name: 'ムロアジ', category: '海', src: '/images/fish_muroazi.png', caught: false },
  { name: 'メアジ', category: '海', src: '/images/fish_meazi.png', caught: false },
  { name: 'マルアジ', category: '海', src: '/images/fish_maruazi.png', caught: false },
  { name: 'オキアジ', category: '海', src: '/images/fish_okiazi.png', caught: false },
  { name: 'キアジ', category: '海', src: '/images/fish_kiazi.png', caught: false },
  { name: 'クロアジ', category: '海', src: '/images/fish_kuroazi.png', caught: false },
  { name: 'ギンガメアジ', category: '海', src: '/images/fish_gingameazi.png', caught: false },
  { name: 'ロウニンアジ', category: '海', src: '/images/fish_rouninazi.png', caught: false },
  { name: 'アイナメ', category: '海', src: '/images/fish_ainame.png', caught: false },
  { name: 'ハタハタ', category: '海', src: '/images/fish_hatahata.png', caught: false },
  { name: 'メジナ', category: '海', src: '/images/fish_mejina.png', caught: false },
  { name: 'サヨリ', category: '海', src: '/images/fish_sayori.png', caught: false },
  { name: 'ホッケ', category: '海', src: '/images/fish_hokke.png', caught: false },
  { name: 'アラ', category: '海', src: '/images/fish_ara.png', caught: false },
  { name: 'タカベ', category: '海', src: '/images/fish_takabe.png', caught: false },
  { name: 'オコゼ', category: '海', src: '/images/fish_okoze.png', caught: false },
  { name: 'シイラ', category: '海', src: '/images/fish_shiira.png', caught: false },
  { name: 'ウツボ', category: '海', src: '/images/fish_utsubo.png', caught: false },
  { name: 'ミノカサゴ', category: '海', src: '/images/fish_minokasago.png', caught: false },
  { name: 'ネコザメ', category: '海', src: '/images/fish_nekosame.png', caught: false },
  { name: 'ガザミ', category: '海', src: '/images/fish_gazami.png', caught: false },
  { name: 'イセエビ', category: '海', src: '/images/fish_iseebi.png', caught: false },
  { name: 'サクラエビ', category: '海', src: '/images/fish_sakuraebi.png', caught: false },
  { name: 'シオマネキ', category: '海', src: '/images/fish_shiomaneki.png', caught: false },
  { name: 'サザエ', category: '海', src: '/images/fish_sazae.png', caught: false },
  { name: 'アワビ', category: '海', src: '/images/fish_awabi.png', caught: false },
  { name: 'ウニ', category: '海', src: '/images/fish_uni.png', caught: false },
  { name: 'ハンマーヘッドシャーク', category: '海', src: '/images/fish_hammerheadshark.png', caught: false },
  { name: 'ドチザメ', category: '海', src: '/images/fish_dotizame.png', caught: false },
  { name: 'ホシザメ', category: '海', src: '/images/fish_hosizame.png', caught: false },
  { name: 'チョウザメ', category: '海', src: '/images/fish_tyouzame.png', caught: false },
  { name: 'サカタザメ', category: '海', src: '/images/fish_sakatazame.png', caught: false },
  { name: 'ハゼ', category: '海', src: '/images/fish_haze.png', caught: false },
  { name: 'イルカ', category: '海', src: '/images/fish_iruka.png', caught: false },
  { name: 'クジラ', category: '海', src: '/images/fish_kuzira.png', caught: false },
  { name: 'シャチ', category: '海', src: '/images/fish_syati.png', caught: false },
  { name: 'ジンベイザメ', category: '海', src: '/images/fish_zinbeizame.png', caught: false },
  { name: 'クマノミ', category: '海', src: '/images/fish_kumanomi.png', caught: false },
  { name: 'カクレクマノミ', category: '海', src: '/images/fish_kakurekumanomi.png', caught: false },


  // 川・湖
  { name: 'ニジマス', category: '川', src: '/images/fish_nijimasu.png', caught: false },
  { name: 'コイ', category: '川', src: '/images/fish_koi.png', caught: false },
  { name: 'アユ', category: '川', src: '/images/fish_ayu.png', caught: false },
  { name: 'ウナギ', category: '川', src: '/images/fish_unagi.png', caught: false },
  { name: 'イワナ', category: '川', src: '/images/fish_iwana.png', caught: false },
  { name: 'ヤマメ', category: '川', src: '/images/fish_yamame.png', caught: false },
  { name: 'ウグイ', category: '川', src: '/images/fish_ugui.png', caught: false },
  { name: 'オイカワ', category: '川', src: '/images/fish_oikawa.png', caught: false },
  { name: 'ドジョウ', category: '川', src: '/images/fish_dojo.png', caught: false },
  { name: 'ナマズ', category: '川', src: '/images/fish_namazu.png', caught: false },
  { name: 'タカハヤ', category: '川', src: '/images/fish_haya.png', caught: false },
  { name: 'フナ', category: '湖', src: '/images/fish_funa.png', caught: false },
  { name: 'ワカサギ', category: '湖', src: '/images/fish_wakasagi.png', caught: false },
  { name: 'ブラックバス', category: '湖', src: '/images/fish_blackbass.png', caught: false },
  { name: 'ブルーギル', category: '湖', src: '/images/fish_bluegill.png', caught: false },
  { name: 'ニゴイ', category: '湖', src: '/images/fish_nigoi.png', caught: false },
  { name: 'ハス', category: '湖', src: '/images/fish_has.png', caught: false },
  { name: 'モロコ', category: '湖', src: '/images/fish_moroko.png', caught: false },
  { name: 'カワムツ', category: '川', src: '/images/fish_kawamutsu.png', caught: false },
  { name: 'カマツカ', category: '川', src: '/images/fish_kamatsuka.png', caught: false },
  { name: 'ヌマチチブ', category: '川', src: '/images/fish_numatitibu.png', caught: false },
  { name: 'ヨシノボリ', category: '川', src: '/images/fish_yoshinobori.png', caught: false },
  { name: 'ハヤ', category: '川', src: '/images/fish_haya.png', caught: false },
  { name: 'シジミ', category: '川', src: '/images/fish_sizimi.png', caught: false },
  { name: 'サクラマス', category: '川', src: '/images/fish_sakuramasu.png', caught: false },
  { name: 'サツキマス', category: '川', src: '/images/fish_satukimasu.png', caught: false },
  { name: 'アマゴ', category: '川', src: '/images/fish_amago.png', caught: false },
  { name: 'ビワマス', category: '川', src: '/images/fish_biwamasu.png', caught: false },
  { name: 'クチボソ', category: '川', src: '/images/fish_kutiboso.png', caught: false },
  { name: 'タナゴ', category: '川', src: '/images/fish_tanago.png', caught: false },
  { name: 'カネヒラ', category: '川', src: '/images/fish_kanehira.png', caught: false },
  { name: 'ヤリタナゴ', category: '川', src: '/images/fish_yaritanago.png', caught: false },
  { name: 'ゲンゴロウブナ', category: '湖', src: '/images/fish_gengoroubuna.png', caught: false },
  { name: 'ギギ', category: '川', src: '/images/fish_gigi.png', caught: false },
  { name: 'アブラハヤ', category: '川', src: '/images/fish_aburahaya.png', caught: false },
  { name: 'スモールマウスバス', category: '湖', src: '/images/fish_smallmouthbass.png', caught: false },
  { name: 'カダヤシ', category: '川', src: '/images/fish_kadayashi.png', caught: false },
  { name: 'アリゲーターガー', category: '湖', src: '/images/fish_alligator_gar.png', caught: false },
  { name: 'ティラピア', category: '川', src: '/images/fish_tilapia.png', caught: false },
  { name: 'グッピー', category: '川', src: '/images/fish_guppy.png', caught: false },
  { name: 'テナガエビ', category: '川', src: '/images/fish_tenagaebi.png', caught: false },
  { name: 'モクズガニ', category: '川', src: '/images/fish_mokuzugani.png', caught: false },
  { name: 'アメリカザリガニ', category: '川', src: '/images/fish_zarigani.png', caught: false },

];

export default function FishCatalog({ onClose, caughtFishList }) {
  const [selectedCategory, setSelectedCategory] = useState('海');

  const categories = ['海', '川・湖'];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="fish-catalog-container">
      {/* ヘッダー部分 */}
      <div className="fish-catalog-header">
        <h2>つりラン図鑑</h2>
        <button className="close-button" onClick={onClose}>閉じる ✕</button>
      </div>

      {/* カテゴリボタン */}
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 魚グリッド */}
      <div className="fish-grid">
        {allFishSpecies
          .filter(fish => {
            if (selectedCategory === '海') return fish.category === '海';
            if (selectedCategory === '川・湖') return fish.category === '川' || fish.category === '湖';
            return false;
          })
          .map(fish => {
            const caught = caughtFishList.includes(fish.name);
            return (
              <div key={fish.name} className={`fish-card ${caught ? 'caught' : 'not-caught'}`}>
                <img src={fish.src} alt={fish.name} />
                <div className="fish-name">{fish.name}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}