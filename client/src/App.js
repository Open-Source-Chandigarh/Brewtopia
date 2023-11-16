import "./styles/App.css";
import Product from "./components/product.js";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import profilepic from "./profilepic.jpg";
import CartItem from "./components/cartitem";
import { TiShoppingCart } from "react-icons/ti";
import {BiLogOut} from "react-icons/bi"
import toast from "react-hot-toast";
import Axios from "axios";
import Order from "./components/order";
import {GoChecklist} from "react-icons/go"
import {AiOutlineDown} from "react-icons/ai"

function App() {

  //defining variables
  const [name, setName] = useState("");
  const [username, setuserName] = useState("");
  const cookies = new Cookies();

  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);

  const [orders,setOrders] = useState([]);

  //arrays for items
  const hotclassics = [
    {
      name: "Cappuccino",
      image:
        "https://th.bing.com/th?id=OIP.HnhE2WHRZKeuvmrh5OFJJAHaGL&w=273&h=228&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      quantity: "(120ml | 128.90kcal)",
      stars: "★★★★☆",
      price: "150",
    },
    {
      name: "Latte",
      image:
        "https://th.bing.com/th/id/OIP.BaVRP8CYqSI7_cxApNF9hAHaFj?pid=ImgDet&rs=1",
      quantity: "(240ml | 136kcal)",
      stars: "★★★★☆",
      price: "160",
    },
    {
      name: "Espresso",
      image:
        "https://pluspng.com/img-png/espresso-png-cafe-caffe-coffee-espresso-macchiato-icon-512.png",
      quantity: "(30ml | 3kcal)",
      stars: "★★★★★",
      price: "100",
    },
    {
      name: "Americano",
      image:
        "https://th.bing.com/th/id/R.5e4bcb48872ad84048118f89194a08a2?rik=yWKbU6nj%2btLi2A&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fcup-of-coffee-transparent-background%2fcup-of-coffee-transparent-background-4.png&ehk=wWe7KTZAkTCVDmQXNPrHyGdH%2f%2fZMhr5ZM8tWbsW9C0g%3d&risl=&pid=ImgRaw&r=0",
      quantity: "(240ml | 15kcal)",
      stars: "★★★★☆",
      price: "120",
    },
    {
      name: "Macchiato",
      image:
        "https://th.bing.com/th/id/R.4c589c36798b947249f77973d7baa7ba?rik=6NmrDxPuxhOEvg&riu=http%3a%2f%2fbk-emea-prd.s3.amazonaws.com%2fsites%2fburgerking.es%2ffiles%2fBK_Web_CAFEMACCHIATTO_500X540px.png&ehk=oDm0XTlDsVffK1cjk2hNtwWlf4McpfeCuGBzOG9bPMM%3d&risl=&pid=ImgRaw&r=0",
      quantity: "(30ml | 13kcal)",
      stars: "★★★★★",
      price: "110",
    },
    {
      name: "Mocha",
      image:
        "https://sevenleavestea.com/wp-content/uploads/2020/02/cafe_mocha_hot-1.png",
      quantity: "(240ml | 290kcal)",
      stars: "★★★★☆",
      price: "170",
    },
    {
      name: "Flat White",
      image:
        "https://unitedbaristas.com/wp-content/uploads/2020/07/Flat-White.png",
      quantity: "(160ml | 155kcal)",
      stars: "★★★★★",
      price: "180",
    },
    {
      name: "Cortado",
      image: "https://vips.com.mx/img/2019/platillosdic/espresso.png",
      quantity: "(60ml | 25kcal)",
      stars: "★★★★☆",
      price: "140",
    },
  ];
  const chillers = [
    {
      name: "Iced Latte",
      image:
        "https://www.villagecoffee.biz/wp-content/uploads/2017/01/Iced_Coffee.png",
      quantity: "(240ml | 100kcal)",
      stars: "★★★★☆",
      price: "150",
    },
    {
      name: "Iced Mocha",
      image:
        "https://www.villagecoffee.biz/wp-content/uploads/2017/01/iced-mocha.png",
      quantity: "(240ml | 230kcal)",
      stars: "★★★★☆",
      price: "160",
    },
    {
      name: "Iced Americano",
      image:
        "https://mrlukecy.com/wp-content/uploads/2020/05/ice-americano.png",
      quantity: "(240ml | 15kcal)",
      stars: "★★★★★",
      price: "140",
    },
    {
      name: "Iced Cappuccino",
      image:
        "https://th.bing.com/th/id/OIP.AR_dWEOhC9Swo83eZPgcOwHaKn?pid=ImgDet&rs=1",
      quantity: "(240ml | 120kcal)",
      stars: "★★★★☆",
      price: "150",
    },
    {
      name: "Iced Macchiato",
      image:
        "https://www.starbucks.com.au/imagecache/bestfit/620x634/_files/product-images/iced-bev/sbx20181116-21519-icedcaramelmacchiato-onwhite-corelib-srgb.png",
      quantity: "(240ml | 100kcal)",
      stars: "★★★★★",
      price: "160",
    },
    {
      name: "Iced Flat White",
      image:
        "https://cayman.latinosmarketing.com/wp-content/uploads/2021/10/cedAlmondmilkHoneyFlatWhite-onGreen_CoreLib_sRGB.png",
      quantity: "(240ml | 155kcal)",
      stars: "★★★★★",
      price: "170",
    },
    {
      name: "Iced Chai Latte",
      image:
        "https://cdn.shopify.com/s/files/1/0319/0764/3436/products/iced-chai-latte.png?v=1597107619",
      quantity: "(120ml | 45kcal)",
      stars: "★★★★☆",
      price: "160",
    },
    {
      name: "Iced Tea",
      image:
        "https://zennarestaurant.com/wp-content/uploads/2020/05/25_original-600x921.png",
      quantity: "(60ml | 10kcal)",
      stars: "★★★★★",
      price: "140",
    },
  ];
  const delights = [
    {
      name: "Blueberry Muffin",
      image:
        "https://th.bing.com/th/id/R.7e5aa4d4c384177a64b9badf9a87198c?rik=3%2f1H7Zchmr5p3A&riu=http%3a%2f%2fwww.stickpng.com%2fassets%2fimages%2f589605c8cba9841eabab60f1.png&ehk=TE6MG%2bU2ty11TJv2O1oqg6MGteZbz4wEdYktQ%2brRrNs%3d&risl=&pid=ImgRaw&r=0",
      quantity: "(1 muffin | 360kcal)",
      stars: "★★★★☆",
      price: "150",
    },
    {
      name: "Chocolate chip",
      image:
        "https://s.aolcdn.com/hss/storage/midas/5dcaf45958518f5359f1c125818955cd/204154183/CA!_Thins_Orig-01.png",
      quantity: "(1 cookie | 200kcal)",
      stars: "★★★★☆",
      price: "100",
    },
    {
      name: "Croissant",
      image: "https://pngimg.com/uploads/croissant/croissant_PNG46700.png",
      quantity: "(1 croissant | 260kcal)",
      stars: "★★★★★",
      price: "120",
    },
    {
      name: "Bagel Cream",
      image:
        "https://pluspng.com/img-png/bagel-and-cream-cheese-png-cream-cheese-500.png",
      quantity: "(1 bagel | 350kcal)",
      stars: "★★★★☆",
      price: "130",
    },
    {
      name: "Cinnamon Roll",
      image:
        "https://i0.wp.com/www.cinnabonlawton.com/wp-content/uploads/2014/09/classic_roll.png?w=1080",
      quantity: "(1 roll | 400kcal)",
      stars: "★★★★★",
      price: "140",
    },
    {
      name: "Scone Cream",
      image:
        "https://ambersofamersham.com/wp-content/uploads/2015/07/scone1.png",
      quantity: "(1 scone | 300kcal)",
      stars: "★★★★☆",
      price: "160",
    },
    {
      name: "Brownie",
      image:
        "https://www.pastelesdlulu.com/wp-content/uploads/2014/01/brownie.png",
      quantity: "(1 brownie | 350kcal)",
      stars: "★★★★★",
      price: "150",
    },
    {
      name: "Cheesecake",
      image:
        "https://th.bing.com/th/id/R.7bec1b8673b5772e0e01a8566014808a?rik=yF4Z2Xu8OIEcbg&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fCheesecake-PNG.png&ehk=QabuHmjW%2f%2fYoBOJkX%2b9K0HyKA44R3WelaQWzKuUoZC4%3d&risl=&pid=ImgRaw&r=0",
      quantity: "(1 slice | 400kcal)",
      stars: "★★★★☆",
      price: "200",
    },
  ];
  const sweettooth = [
    {
      name: "Chocolate Cake",
      image:
        "https://th.bing.com/th/id/R.a69fe09a2f9d7f9f6139489095a2c294?rik=GFliO1fQrh0RuA&riu=http%3a%2f%2fwww.pngplay.com%2fwp-content%2fuploads%2f2%2fChocolate-Cake-Download-Free-PNG.png&ehk=UcSWSF9GFhAbIlZ2%2bQKnM2T7W%2fcUzg7duoBq7PhxC7Y%3d&risl=&pid=ImgRaw&r=0",
      quantity: "(1 slice | 350kcal)",
      stars: "★★★★☆",
      price: "150",
    },
    {
      name: "Apple Pie",
      image: "https://www.pngmart.com/files/11/Apple-Pie-PNG-File.png",
      quantity: "(1 slice | 300kcal)",
      stars: "★★★★☆",
      price: "140",
    },
    {
      name: "Ice Cream Sundae",
      image:
        "https://th.bing.com/th/id/OIP.oKbYQkiyBNBLw6FHLar5awHaOW?w=114&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      quantity: "(1 sundae | 450kcal)",
      stars: "★★★★★",
      price: "160",
    },
    {
      name: "Tiramisu",
      image:
        "https://th.bing.com/th/id/R.5d4c452355686b6384332bee9b4eb30f?rik=YoTZ6%2bzB%2bJEGlg&riu=http%3a%2f%2fwww.balconidolciaria.com%2fwp-content%2fuploads%2f2017%2f09%2fingredientitortatiramisu.png&ehk=Cio3ygIwUJvnZhher9cNVRJeLCphvtcm94lZfVRfud4%3d&risl=&pid=ImgRaw&r=0",
      quantity: "(1 slice | 400kcal)",
      stars: "★★★★☆",
      price: "170",
    },
    {
      name: "Chocolate Truffles",
      image:
        "https://th.bing.com/th/id/R.c82ac2055a9adb9db617cead89993cfc?rik=TRIi5F8oHjfJGw&riu=http%3a%2f%2fjasnagracake.in%2fwp-content%2fuploads%2f2018%2f10%2fchocolate-truffle.png&ehk=CoKBM1uJ%2bthKDPiioP6N%2fA%2foxLbjrUGphrMWxknznBo%3d&risl=&pid=ImgRaw&r=0",
      quantity: "(3 truffles | 250kcal)",
      stars: "★★★★★",
      price: "180",
    },
    {
      name: "Fruit Tart",
      image:
        "https://www.friarymill.co.uk/wp-content/uploads/2016/11/friary-fruit-tart.png",
      quantity: "(1 tart | 300kcal)",
      stars: "★★★★☆",
      price: "150",
    },
    {
      name: "Creme Brulee",
      image:
        "https://th.bing.com/th/id/OIP.GaOjIpB-kTWQ2dX3A_451wHaIt?w=143&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      quantity: "(1 serving | 350kcal)",
      stars: "★★★★★",
      price: "160",
    },
    {
      name: "Panna Cotta",
      image:
        "https://www.delicesdecourbet.com/en/assets/img/produits/prd-2-demo.png",
      quantity: "(1 serving | 300kcal)",
      stars: "★★★★☆",
      price: "150",
    },
  ];

  //logout function 
  function logout() {
    cookies.remove("username");
    cookies.remove("name");

    toast.error("logged out");

    //reloading the page to reflect changes
    window.location.reload(false);
  }

  //handling payment when clicked on checkout button
  const handlePayment = async (total,username) => {

    //checking if cart has items
    if(cart.length === 0){
      return toast.error("Cart is empty");
    }

    //getting razorpay key from server
    const {data : {key}} = await Axios.get("https://cafe-management-system-api.onrender.com/getKey");

    //posting server with amount 
    const {data : {order}} = await Axios.post("https://cafe-management-system-api.onrender.com/checkout", {
      amount : total
    })

    //options for razorpay window [...all copied from razorpay setup sdk]
    var options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Brewtopia",
      description: "Test Transaction",
      image: "https://avatars.githubusercontent.com/u/98728916?v=4",
      order_id: order.id, 
      callback_url: `https://cafe-management-system-api.onrender.com/paymentverification?username=${username}`,
      prefill: {
          name: {username},
          email: {username},
          contact: "9000090000"
      },
      notes: {
          address: "Razorpay Corporate Office"
      },
      theme: {
          color: "#ecd3bd"
      }}

      //here opens the razorpay window ... window has Razorpay method
      //because we put script tag of razorpay in index.html
      var razor = new window.Razorpay(options);
      razor.open();

  }

  //making request to server for the data of user cart  and orders
  useEffect(() => {

      //setting username and name from cookies
      setuserName(cookies.get("username"));
      setName(cookies.get("name"));
      
      //request to server for cart and orders
      const servercart = async () => {
        const cart = await Axios.post("https://cafe-management-system-api.onrender.com/getCart", {
          username: username
        })
        setCart(cart.data);

        const AllOrders = await Axios.post("https://cafe-management-system-api.onrender.com/getOrders", {
          username : username
        })
        setOrders(AllOrders.data);
      }
      servercart();

  }, [username]);

  //updating server cart and also updating total on server side
  useEffect(() => {

    //updating total on client
    var total = cart.reduce(
      (acc, product) => acc + product.price * product.count,
      0
    );
    setTotal(total);

    //posting server with updated cart
    Axios.post("https://cafe-management-system-api.onrender.com/updateCart", {
      "username": username,
      "cart": cart,
      "cartTotal": total
    }
    )
  }, [cart]) //whenever cart changes these requests will be made to server

  return (
    <div className="App">

      {/* Navbar of app */}
      <nav className="nav">
        <a href="/">BREWTOPIA</a>
        <h3>info@brewtopiacafe.com</h3>
      </nav>

      {/* Mapping all orders from orders array and showing on frontend */}
      <div className="orders-wrap">
        <h2><GoChecklist></GoChecklist> Your Orders</h2>
        <div className="orders">

          {/* checking if there are previous orders  by user */}
          {orders.length>0 ? 
            orders.map((order, index = orders.indexOf(order)) =>{
              return <Order key={index} order = {order}></Order>
            })
            : "No orders yet..."
          }
        </div>
      </div>  
      
      {/* Mapping all cartitems from cart array and showing on frontend */}
      <div className="cart">
        <h2>Your Cart</h2>
        <div className="cart-items">

          {/* checking if cart has any objects */}
          {cart.length > 0
            ? cart.map((item, index = cart.indexof(item)) => {

              // giving props to cartitem and giving states also so we can change them there
              return (
                <CartItem
                  key={index}
                  item={item}
                  cart={cart}
                  setCart={setCart}
                  total={total}
                ></CartItem>
              );
            })
            : "Added items will be shown here"}
        </div>

        {/* showing cart total  */}
        <div className="cart-total">
          <p>Total : {total}</p>
          <button type="button" onClick={() => handlePayment(total,username)}>
            <TiShoppingCart color="white" style={{fontSize : "1.2rem"}}></TiShoppingCart>
            Checkout
          </button>
        </div>

        {/* showing user profile with logout button */}
        <div className="user">
          <img src={profilepic} alt="" />
          <div className="username">
            <h3>{name}</h3>
            <p>@{username}</p>
          </div>
          <button type="button" onClick={() => logout()}>
            <BiLogOut></BiLogOut>
          </button>
        </div>
      </div>
      
      {/* Here we are mapping all the products in product1 grid -- it acts like wrap */}
      {/* then placing in product-container and mapping each category */}
      <main className="main">
        <div id="product1">
          <h2>HOT CLASSICS</h2>
          <div className="product-container">
            {hotclassics.map(
              (classic, index = hotclassics.indexof(classic)) => {
                return (
                  <Product
                    key={index}
                    product={classic}
                    cartState={cart}
                    setCart={setCart}
                    total={total}
                    setTotal={setTotal}
                  ></Product>
                );
              }
            )}
          </div>
        </div>
        <div id="product2">
          <h2>ALL TIME CHILLERS</h2>
          <div className="product-container">
            {chillers.map((classic, index = chillers.indexof(classic) * 2) => {
              return (
                <Product
                  key={index}
                  product={classic}
                  cartState={cart}
                  setCart={setCart}
                  total={total}
                  setTotal={setTotal}
                ></Product>
              );
            })}
          </div>
        </div>
        <div id="product3">
          <h2>ALL DAY DELIGHTS</h2>
          <div className="product-container">
            {delights.map((classic, index = delights.indexof(classic) * 3) => {
              return (
                <Product
                  key={index}
                  product={classic}
                  cartState={cart}
                  setCart={setCart}
                  total={total}
                  setTotal={setTotal}
                ></Product>
              );
            })}
          </div>
        </div>
        <div id="product4">
          <h2>SWEET TOOTH</h2>
          <div className="product-container">
            {sweettooth.map((classic, index = sweettooth.indexof(classic)) => {
              return (
                <Product
                  key={index}
                  product={classic}
                  cartState={cart}
                  setCart={setCart}
                  total={total}
                  setTotal={setTotal}
                ></Product>
              );
            })}
          </div>
        </div>
      </main>

      {/* this is down button --basically showing user that he has to scroll for more contents */}
      <button className="down"><AiOutlineDown></AiOutlineDown> </button>

      {/* footer starts here */}
      <footer className="footer">
        <div className="col-1">
          <p>
            Brewtopia is a cozy and inviting cafe that offers a wide range of
            delicious coffee and tea beverages, as well as tasty snacks and
            treats. Our welcoming atmosphere and friendly staff make Brewtopia
            the perfect place to relax. Our menu features a variety of specialty
            drinks, including our signature lattes and cold brews, made with
            only the highest quality ingredients.
            <br />
            <span>© 2023 Published by Brewtopia cafe</span>
          </p>
          <a href="">Cafe Policy</a>
        </div>

        {/* for navigation */}
        <div className="col-2">
          <a href="#product1">HOT CLASSICS</a>
          <a href="#product2">ALL TIME CHILLERS</a>
          <a href="#product3">ALL DAY DELIGHTS</a>
          <a href="#product4">SWEET TOOTH</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
