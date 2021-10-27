import React, { useState } from "react";
import CustomerCSS from "./customer.module.css";
import Modal from "react-modal";

export default function Customer() {
  const [display, setdisplay] = useState(getfromlocalstorage());
  const [username, setName] = useState(user_loged_in());
  let [img, setImg] = useState("");
  let [body, setBody] = useState("");
  const [modal, setModal] = useState(false);

  function getfromlocalstorage() {
    let arr = localStorage.getItem("Products_details");
    arr = arr ? JSON.parse(arr) : [];
    return arr;
  }

  function user_loged_in() {
    let user = localStorage.getItem("loged_in_user");
    user = user ? JSON.parse(user) : "";
    return user;
  }

  function logout() {
    window.open("/login", "_self");
    localStorage.setItem("loged_in_user", JSON.stringify(""));
  }

  // when we click on view discription

  function viewDiscription(e) {
    let arr = JSON.parse(localStorage.getItem("Products_details"));

    arr = arr.filter((element) => {
      if (e === element.id) return true;
    });

    img = arr[0].product_url;
    body = arr[0].product_discription;

    console.log(arr);

    setImg(img);
    setBody(body);
    setModal(true);
  }

  // when user click on add to cart button

  function addTOCart(e, user1) {
    let user = JSON.parse(localStorage.getItem("loged_in_user"));
    if (user) {
      console.log(`yes`);

      let array = JSON.parse(localStorage.getItem("Products_details"));

      array = array.filter((element) => {
        if (element.id === e) return true;
      });

      console.log(array);

      let arr = localStorage.getItem("cart");
      arr = arr ? JSON.parse(arr) : [];

      console.log(arr);

      if (arr.length === 0) {
        alert("Successfully added to cart");
        arr.push({
          product_name: array[0].product_name,
          product_price: array[0].product_price,
          product_quantity: array[0].product_quantity,
          user,
          id: array[0].id,
          product_url: array[0].product_url,
          product_present_quantity: 0,
          minus: "",
          plus: "",
        });
      } else {
        let new_arr = arr.filter((element) => {
          if (element.id === e && user === element.user) return true;
        });
        console.log(new_arr);
        if (new_arr.length !== 0) alert("Already Added To cart!!!");
        else {
          alert("Successfully added to cart");
          arr.push({
            product_name: array[0].product_name,
            product_price: array[0].product_price,
            product_quantity: array[0].product_quantity,
            user,
            id: array[0].id,
            product_url: array[0].product_url,
            product_present_quantity: 0,
            minus: "",
            plus: "",
          });
        }
      }
      localStorage.setItem("cart", JSON.stringify(arr));
    } else {
      console.log(`not loged in`);
      alert("Log in first");
      window.open("/login", "_self");
    }
  }

  // when user clicks on go to cart button

  function GoToCart() {
    let user = localStorage.getItem("loged_in_user");
    user = user ? JSON.parse(user) : "";
    console.log(user);
    if (user) window.open("/cart", "_self");
    else {
      alert("Log in first");
      window.open("/login", "_self");
    }
  }

  return (
    <div>
      <h1>Welcome {username}</h1>
      <div className={CustomerCSS.btn_section}>
        <button onClick={logout} className={CustomerCSS.btn}>
          Logout
        </button>
        <button onClick={GoToCart} className={CustomerCSS.btn_cart}>
          Got To Cart
        </button>
      </div>
      <div className={CustomerCSS.box}>
        <div className="row">
          {display.map((element) => {
            return (
              <div id={element.id} key={element.id} className="col-sm-4">
                <div className={CustomerCSS.product_container}>
                  <img
                    className={CustomerCSS.image}
                    src={element.product_url}
                  />
                  <div className={CustomerCSS.name_block}>
                    <p>Name:</p>
                    <div className={CustomerCSS.fix}>
                      {element.product_name}
                    </div>
                  </div>
                  <div className={CustomerCSS.price_box}>
                    <p>Price:</p>
                    <div className={CustomerCSS.fix}>
                      {element.product_price}
                    </div>
                  </div>
                  <div className={CustomerCSS.button_box}>
                    <button
                      onClick={() => addTOCart(element.id, element.user)}
                      className={CustomerCSS.add_to_cart}
                    >
                      Add To cart
                    </button>
                    <button
                      onClick={() => viewDiscription(element.id)}
                      className={CustomerCSS.view_discription}
                    >
                      View Disc.
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* modal */}

      <Modal
        className={CustomerCSS.modal}
        isOpen={modal}
        onRequestClose={() => setModal(false)}
      >
        <button
          className={CustomerCSS.close_btn}
          onClick={() => setModal(false)}
        >
          X
        </button>
        <div className="text-center">
          <img className={CustomerCSS.img} src={img}></img>
        </div>
        <h3>{body}</h3>
      </Modal>
    </div>
  );
}
