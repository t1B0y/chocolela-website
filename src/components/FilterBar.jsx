import React, { useState, useRef, useEffect } from 'react';
import {
  FilterBar as ContainerBar,
  FilterBtnContainer,
} from '../styledComponents/FilterBar';

import { toggleFilter } from '../redux/filter';
import downArrow from '../assets/down_arrow.svg';
import gsap from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/products';
import { useParams, useSearchParams } from 'react-router-dom';
import Checkbox from '../styledComponents/Checkbox';

function FilterBar() {
  let [searchParams, setSearchParams] = useSearchParams();
  const menuBar = useRef();
  const [animations, setAnimations] = useState([]);
  const [isOpen, setIsOpen] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const menu = gsap.utils.selector(menuBar.current);
    const groups = menu('.accordion-group');

    for (let group of groups) {
      createAnimation(group.id);
    }

    function createAnimation(id) {
      const group = menu(`#${id}`);
      const arrow = gsap.utils.selector(group[0])('.arrow-down');
      const content = gsap.utils.selector(group[0])('.accordion-content');
      const timeline = gsap.timeline({ paused: true });
      timeline
        .to(content, {
          height: 'auto',
          duration: 0.5,
          ease: 'power1.inOut',
          transformOrigin: 'top center',
        })
        .to(arrow, { rotate: 180, duration: 0.3 }, 0);
      setAnimations((prev) => [...prev, timeline]);
      setIsOpen((prev) => [...prev, false]);
    }
    // dispatch(fetchProducts());
  }, []);

  const toggle = (num) => {
    if (isOpen[num]) {
      animations[num].reverse();
      setIsOpen((prev) => {
        prev[num] = false;
        return prev;
      });
    } else {
      animations[num].play();
      setIsOpen((prev) => {
        prev[num] = true;
        return prev;
      });
    }
  };

  useEffect(() => {
    const inputs = menuBar.current.querySelectorAll('input');
    let params = searchParams.get('category').split(',');
    for (let input of inputs) {
      if (params.includes(input.value)) {
        input.checked = true;
      } else {
        input.checked = false;
      }
    }
  }, [searchParams]);

  const toggleCheckBox = (e) => {
    let params = searchParams.get('category').split(',');
    console.log(params);
    if (params.includes(e.target.value)) {
      params.splice(params.indexOf(e.target.value), 1);
    } else {
      params.push(e.target.value);
    }
    setSearchParams({ category: params.join(',') });
  };

  return (
    <ContainerBar ref={menuBar}>
      <span className="title">Filtre</span>
      <div className="accordion-group" id="accordion-content-chocolats">
        <div className="accordion-category" onClick={() => toggle(0)}>
          <span>Chocolats</span>
          <img className="arrow-down" src={downArrow} />
        </div>
        <div className="accordion-content">
          <Checkbox
            label="Tous nos chocolats"
            id="chocolats_chocolats"
            name="chocolats_chocolats"
            value={17}
            onChange={(e) => toggleCheckBox(e)}
          />
          <Checkbox
            label="Ballotins"
            id="chocolats_ballotins"
            name="chocolats_ballotins"
            value={18}
            onChange={(e) => toggleCheckBox(e)}
          />

          <Checkbox
            label="Tablettes"
            id="chocolats_tablettes"
            name="chocolats_tablettes"
            value={19}
            onChange={(e) => toggleCheckBox(e)}
          />

          <Checkbox
            label="Noel"
            id="chocolats_noel"
            name="chocolats_noel"
            value={31}
            onChange={(e) => toggleCheckBox(e)}
          />

          <Checkbox
            label="Paques"
            id="chocolats_paques"
            name="chocolats_paques"
            value={32}
            onChange={(e) => toggleCheckBox(e)}
          />

          <Checkbox
            label="Saint-Valentin"
            id="chocolats_stValentin"
            name="chocolats_stValentin"
            value={33}
            onChange={(e) => toggleCheckBox(e)}
          />
        </div>
      </div>
      <div className="accordion-group" id="accordion-content-patisseries">
        <div className="accordion-category" onClick={() => toggle(1)}>
          <span>Patisseries</span>
          <img className="arrow-down" src={downArrow} />
        </div>
        <div className="accordion-content">
          <Checkbox
            label="Toutes les patisseries"
            id="patisseries_patisseries"
            name="patisseries_patisseries"
            value={27}
            onChange={(e) => toggleCheckBox(e)}
          />

          <Checkbox
            label="Gateaux"
            id="patisseries_gateaux"
            name="patisseries_gateaux"
            value={28}
            onChange={(e) => toggleCheckBox(e)}
          />

          <Checkbox
            label="Vienoiseries"
            id="patisseries_vienoiseries"
            name="patisseries_vienoiseries"
            value={30}
            onChange={(e) => toggleCheckBox(e)}
          />
        </div>
      </div>
      <div className="accordion-group" id="accordion-content-fetes">
        <div className="accordion-category" onClick={() => toggle(2)}>
          <span>Fetes</span>
          <img className="arrow-down" src={downArrow} />
        </div>
        <div className="accordion-content">
          <Checkbox
            label="Tous nos produits pour les fetes"
            id="fetes_fetes"
            name="fetes_fetes"
            value={34}
            onChange={(e) => toggleCheckBox(e)}
          />

          <Checkbox
            label="Noel"
            id="fetes_noel"
            name="fetes_noel"
            value={29}
            onChange={(e) => toggleCheckBox(e)}
          />

          <Checkbox
            label="Paques"
            id="fetes_paques"
            name="fetes_paques"
            value={21}
            onChange={(e) => toggleCheckBox(e)}
          />
          <Checkbox
            label="Saint-Valentin"
            id="fetes_stValentin"
            name="fetes_stValentin"
            value={26}
            onChange={(e) => toggleCheckBox(e)}
          />

          <Checkbox
            label="Cadeaux"
            id="fetes_cadeaux"
            name="fetes_cadeaux"
            value={25}
            onChange={(e) => toggleCheckBox(e)}
          />
        </div>
      </div>
    </ContainerBar>
  );
}

export default FilterBar;
