//Menu items list in different array 
//imported on App.js and mapped

const hotclassics = [
  {
    name: "Cappuccino",
    image:
      "https://th.bing.com/th?id=OIP.HnhE2WHRZKeuvmrh5OFJJAHaGL&w=273&h=228&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    quantity: "(120ml | 128.90kcal)",
    stars: "★★★★☆",
    price: "150",
    category:'hot_classics'
  },
  {
    name: "Latte",
    image:
      "https://th.bing.com/th/id/OIP.BaVRP8CYqSI7_cxApNF9hAHaFj?pid=ImgDet&rs=1",
    quantity: "(240ml | 136kcal)",
    stars: "★★★★☆",
    price: "160",
    category:'hot_classics'
  },
  {
    name: "Espresso",
    image:
      "https://pluspng.com/img-png/espresso-png-cafe-caffe-coffee-espresso-macchiato-icon-512.png",
    quantity: "(30ml | 3kcal)",
    stars: "★★★★★",
    price: "100",
    category:'hot_classics'
    
  },
  {
    name: "Americano",
    image:
      "https://th.bing.com/th/id/R.5e4bcb48872ad84048118f89194a08a2?rik=yWKbU6nj%2btLi2A&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fcup-of-coffee-transparent-background%2fcup-of-coffee-transparent-background-4.png&ehk=wWe7KTZAkTCVDmQXNPrHyGdH%2f%2fZMhr5ZM8tWbsW9C0g%3d&risl=&pid=ImgRaw&r=0",
    quantity: "(240ml | 15kcal)",
    stars: "★★★★☆",
    price: "120",
    category:'hot_classics'
    
  },
  {
    name: "Macchiato",
    image:
      "https://th.bing.com/th/id/R.4c589c36798b947249f77973d7baa7ba?rik=6NmrDxPuxhOEvg&riu=http%3a%2f%2fbk-emea-prd.s3.amazonaws.com%2fsites%2fburgerking.es%2ffiles%2fBK_Web_CAFEMACCHIATTO_500X540px.png&ehk=oDm0XTlDsVffK1cjk2hNtwWlf4McpfeCuGBzOG9bPMM%3d&risl=&pid=ImgRaw&r=0",
    quantity: "(30ml | 13kcal)",
    stars: "★★★★★",
    price: "110",
    category:'hot_classics'
    
  },
  {
    name: "Mocha",
    image:
      "https://sevenleavestea.com/wp-content/uploads/2020/02/cafe_mocha_hot-1.png",
    quantity: "(240ml | 290kcal)",
    stars: "★★★★☆",
    price: "170",
    category:'hot_classics'
    
  },
  {
    name: "Flat White",
    image:
      "https://unitedbaristas.com/wp-content/uploads/2020/07/Flat-White.png",
    quantity: "(160ml | 155kcal)",
    stars: "★★★★★",
    price: "180",
    category:'hot_classics'
    
  },
  {
    name: "Cortado",
    image: "https://th.bing.com/th?id=OIP.E2TNIkaznJKIFvJLjK4BjQHaHP&w=252&h=247&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    quantity: "(60ml | 25kcal)",
    stars: "★★★★☆",
    price: "140",
    category:'hot_classics'
    
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
    category:'chillers'
    
  },
  {
    name: "Iced Mocha",
    image:
      "https://www.villagecoffee.biz/wp-content/uploads/2017/01/iced-mocha.png",
    quantity: "(240ml | 230kcal)",
    stars: "★★★★☆",
    price: "160",
    category:'chillers'
    
  },
  {
    name: "Iced Americano",
    image:
      "https://img.freepik.com/premium-photo/iced-coffee-with-poured-cream-isolated-white-background_185193-16501.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696464000&semt=ais",
    quantity: "(240ml | 15kcal)",
    stars: "★★★★★",
    price: "140",
    category:'chillers'
    
  },
  {
    name: "Iced Cappuccino",
    image:
      "https://th.bing.com/th/id/OIP.AR_dWEOhC9Swo83eZPgcOwHaKn?pid=ImgDet&rs=1",
    quantity: "(240ml | 120kcal)",
    stars: "★★★★☆",
    price: "150",
    category:'chillers'
    
  },
  {
    name: "Iced Macchiato",
    image:
      "https://img.freepik.com/premium-photo/iced-black-coffee-iced-americano-isolated-white-background_536380-64.jpg",
    quantity: "(240ml | 100kcal)",
    stars: "★★★★★",
    price: "160",
    category:'chillers'
    
  },
  {
    name: "Iced Flat White",
    image:
      "https://media.istockphoto.com/id/497897580/photo/iced-coffee-in-takeaway-cup.jpg?s=612x612&w=0&k=20&c=IR0HtWlIcCa_ryIp4l3TMUetuNqWlNxiJxaXPPXJbQc=",
    quantity: "(240ml | 155kcal)",
    stars: "★★★★★",
    price: "170",
    category:'chillers'
    
  },
  {
    name: "Iced Chai Latte",
    image:
      "https://cdn.shopify.com/s/files/1/0319/0764/3436/products/iced-chai-latte.png?v=1597107619",
    quantity: "(120ml | 45kcal)",
    stars: "★★★★☆",
    price: "160",
    category:'chillers'
    
  },
  {
    name: "Iced Tea",
    image:
      "https://zennarestaurant.com/wp-content/uploads/2020/05/25_original-600x921.png",
    quantity: "(60ml | 10kcal)",
    stars: "★★★★★",
    price: "140",
    category:'chillers'
    
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
    category:'delights'
    
  },
  {
    name: "Chocolate chip",
    image:
      "https://s.aolcdn.com/hss/storage/midas/5dcaf45958518f5359f1c125818955cd/204154183/CA!_Thins_Orig-01.png",
    quantity: "(1 cookie | 200kcal)",
    stars: "★★★★☆",
    price: "100",
    category:'delights'
    
  },
  {
    name: "Croissant",
    image: "https://pngimg.com/uploads/croissant/croissant_PNG46700.png",
    quantity: "(1 croissant | 260kcal)",
    stars: "★★★★★",
    price: "120",
    category:'delights'
    
  },
  {
    name: "Bagel Cream",
    image:
      "https://pluspng.com/img-png/bagel-and-cream-cheese-png-cream-cheese-500.png",
    quantity: "(1 bagel | 350kcal)",
    stars: "★★★★☆",
    price: "130",
    category:'delights'
   
  },
  {
    name: "Cinnamon Roll",
    image:
      "https://i0.wp.com/www.cinnabonlawton.com/wp-content/uploads/2014/09/classic_roll.png?w=1080",
    quantity: "(1 roll | 400kcal)",
    stars: "★★★★★",
    price: "140",
    category:'delights'
    
  },
  {
    name: "Scone Cream",
    image:
      "https://media.istockphoto.com/id/153562941/photo/cream-tea-scone.jpg?s=612x612&w=0&k=20&c=SFcnL-VpbrJrebE5-AQGScOdztNSk5Q-LSFqbumOnB4=",
    quantity: "(1 scone | 300kcal)",
    stars: "★★★★☆",
    price: "160",
    category:'delights'
    
  },
  {
    name: "Brownie",
    image:
      "https://www.pastelesdlulu.com/wp-content/uploads/2014/01/brownie.png",
    quantity: "(1 brownie | 350kcal)",
    stars: "★★★★★",
    price: "150",
    category:'delights'
    
  },
  {
    name: "Cheesecake",
    image:
      "https://th.bing.com/th/id/R.7bec1b8673b5772e0e01a8566014808a?rik=yF4Z2Xu8OIEcbg&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fCheesecake-PNG.png&ehk=QabuHmjW%2f%2fYoBOJkX%2b9K0HyKA44R3WelaQWzKuUoZC4%3d&risl=&pid=ImgRaw&r=0",
    quantity: "(1 slice | 400kcal)",
    stars: "★★★★☆",
    price: "200",
    category:'delights'
    
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
    category:'sweet_tooth'
    
  },
  {
    name: "Apple Pie",
    image: "https://www.pngmart.com/files/11/Apple-Pie-PNG-File.png",
    quantity: "(1 slice | 300kcal)",
    stars: "★★★★☆",
    price: "140",
    category:'sweet_tooth'
    
  },
  {
    name: "Ice Cream Sundae",
    image:
      "https://th.bing.com/th/id/OIP.oKbYQkiyBNBLw6FHLar5awHaOW?w=114&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    quantity: "(1 sundae | 450kcal)",
    stars: "★★★★★",
    price: "160",
    category:'sweet_tooth'
    
  },
  {
    name: "Tiramisu",
    image:
      "https://th.bing.com/th/id/R.5d4c452355686b6384332bee9b4eb30f?rik=YoTZ6%2bzB%2bJEGlg&riu=http%3a%2f%2fwww.balconidolciaria.com%2fwp-content%2fuploads%2f2017%2f09%2fingredientitortatiramisu.png&ehk=Cio3ygIwUJvnZhher9cNVRJeLCphvtcm94lZfVRfud4%3d&risl=&pid=ImgRaw&r=0",
    quantity: "(1 slice | 400kcal)",
    stars: "★★★★☆",
    price: "170",
    category:'sweet_tooth'
    
  },
  {
    name: "Chocolate Truffles",
    image:
      "https://th.bing.com/th/id/R.c82ac2055a9adb9db617cead89993cfc?rik=TRIi5F8oHjfJGw&riu=http%3a%2f%2fjasnagracake.in%2fwp-content%2fuploads%2f2018%2f10%2fchocolate-truffle.png&ehk=CoKBM1uJ%2bthKDPiioP6N%2fA%2foxLbjrUGphrMWxknznBo%3d&risl=&pid=ImgRaw&r=0",
    quantity: "(3 truffles | 250kcal)",
    stars: "★★★★★",
    price: "180",
    category:'sweet_tooth'
    
  },
  {
    name: "Fruit Tart",
    image:
      "https://www.friarymill.co.uk/wp-content/uploads/2016/11/friary-fruit-tart.png",
    quantity: "(1 tart | 300kcal)",
    stars: "★★★★☆",
    price: "150",
    category:'sweet_tooth'
    
  },
  {
    name: "Creme Brulee",
    image:
      "https://th.bing.com/th/id/OIP.GaOjIpB-kTWQ2dX3A_451wHaIt?w=143&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    quantity: "(1 serving | 350kcal)",
    stars: "★★★★★",
    price: "160",
    category:'sweet_tooth'
    
  },
  {
    name: "Panna Cotta",
    image:
      "https://www.delicesdecourbet.com/en/assets/img/produits/prd-2-demo.png",
    quantity: "(1 serving | 300kcal)",
    stars: "★★★★☆",
    price: "150",
    category:'sweet_tooth'
  },
];

export {hotclassics,chillers,delights,sweettooth};