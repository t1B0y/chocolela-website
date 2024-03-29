import React from 'react';
import { MenuNav } from '../styledComponents/NavBar';
import ThumbnailNavBar from './ThumbnailNavBar';

function NavBarHover({ cat, close }) {
  const imgs =
    cat === 'chocolats'
      ? [
          'https://chocolela.s3.amazonaws.com/wp-content/uploads/2024/01/16171219/coffrets.jpeg',
          'https://chocolela.s3.amazonaws.com/wp-content/uploads/2024/01/16171513/dernieres.jpeg',
          'https://chocolela.s3.amazonaws.com/wp-content/uploads/2024/01/16171857/20220827_120738-scaled-e1665075529920.jpg',
          'https://chocolela.s3.amazonaws.com/wp-content/uploads/2024/01/16171622/coffret-fenetre-simple-ferme-scaled-1.jpg',
        ]
      : [
          'https://chocolela.s3.amazonaws.com/wp-content/uploads/2024/01/16204132/276-Petits-Gateaux-Japoneses_carrousel04.png',
          'https://chocolela.s3.amazonaws.com/wp-content/uploads/2024/01/16204134/clark-buche-de-noel-superJumbo.jpg',
          'https://chocolela.s3.amazonaws.com/wp-content/uploads/2024/01/16204135/gateauxmenu.jpeg',
          'https://chocolela.s3.amazonaws.com/wp-content/uploads/2024/01/16204137/Little-Black-Pastry-Box-Authentic-French-Patisserie-Pastry-Desserts-Giftbox-Giftset-cake-Boite-de-gateaux-01_e13a8ce0-ba57-4390-a3e4-17dcadec2282.webp',
        ];

  return (
    <MenuNav>
      <div id="container-subMenu" onMouseLeave={() => close()}>
        <div id="side-menu-nav">
          {cat === 'chocolats' ? (
            <>
              <a>Decouvrez nos parfums</a>
              <a href="/produits?category=17">Tout nos chocolats</a>
              <a href="">Nos meilleures vente</a>
              <a href="/produits?category=18">Ballotins</a>
              <a href="/produits?category=19">Tablettes</a>
              <a href="/produits?category=20">Coffret cadeaux</a>
              <a href="/produits?category=31">Noel</a>
              <a href="/produits?category=32">Paques</a>
              <a href="/produits?category=33">Saint-Valentin</a>
            </>
          ) : (
            <>
              <a href="">Toute nos patisserie</a>
              <a href="">Nos meilleures ventes</a>
              <a href="">Noel</a>
              <a href="">Paques</a>
              <a href="">Saint-Valentin</a>
            </>
          )}
        </div>
        <div id="menu-nav-pictures-box">
          <ThumbnailNavBar
            url={
              cat === 'chocolats' ? '/parfums' : '/produits?orderby=popularity'
            }
            imgUrl={imgs[0]}
            text={cat === 'chocolats' ? 'Tout nos parfums' : 'Nos best seller'}
          />
          <ThumbnailNavBar
            imgUrl={imgs[1]}
            url={
              cat === 'chocolats'
                ? '/produits?category=17?orderby=date'
                : '/produits?orderby=popularity'
            }
            text={`Nos nouveaux ${
              cat === 'chocolats' ? 'chocolats' : 'gateaux'
            }`}
          />
          <ThumbnailNavBar
            url={
              cat === 'chocolats'
                ? '/produits?category=17?orderby=popularity'
                : '/produits?orderby=popularity'
            }
            imgUrl={imgs[2]}
            text="Pour la Saint valentin"
          />
          <ThumbnailNavBar
            url={
              cat === 'chocolats'
                ? '/produits?category=17?orderby=popularity'
                : '/produits?orderby=popularity'
            }
            imgUrl={imgs[3]}
            text="Les ballotins"
          />
        </div>
      </div>
      {/* <div className="overlay-subMenu" /> */}
    </MenuNav>
  );
}

export default NavBarHover;
