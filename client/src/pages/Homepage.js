import React, { useState, useEffect } from "react";
import Defaultlayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import ItemList from "../components/ItemList";
import { useDispatch } from "react-redux";

const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("drinks");
  const categories = [
    {
      name: "drinks",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/712/712030.png",
    },
    {
      name: "rice",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/651/651538.png",
    },
    {
      name: "noodles",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/638/638507.png",
    },
  ];
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({ type: "SHOW_LOADING" });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch]);

  return (
    <Defaultlayout>
      <div className="d-flex filter">
        <h5>Filters</h5>
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selectedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <img src={category.imageUrl} alt={category.name} />
            <h6>{category.name}</h6>
          </div>
        ))}
      </div>
      <Row>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item.id} item={item} />
            </Col>
          ))}
      </Row>
    </Defaultlayout>
  );
};

export default Homepage;
