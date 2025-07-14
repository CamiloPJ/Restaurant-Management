import React from "react";
import "./Header.css";
import { assets } from '../../assets/frontend_assets/assets';


export const Header = () => {
  const { header_img } = assets;
  return (
    <div className="header" style={{ backgroundImage: `url(${assets.header_img})` }}>
      <div className="header-contents">
        <h2>Pide tu comida favorita aquí!</h2>
        <p>Elije de una gran diversidad de platos</p>
        <a href="#explore-menu" className="header-button">Ver Menú</a>
      </div>
    </div>
  );
};
