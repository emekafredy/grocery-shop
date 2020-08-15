require('dotenv').config();

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Groceries', [
    {
      name: 'Ice Tea',
      description: `A brilliant taste for a brighter day. Ice Tea 
        is the most refreshingly delicious tea for you and your family.`,
      price: 350,
      discount: 40,
      vendorId: process.env.ADMIN_ID,
      categoryId: 1,
      image: 'https://bigtaste.com.ng/wp-content/uploads/2019/08/ice-tea-600x600.png',
      image2: 'https://5.imimg.com/data5/GD/GM/MY-764091/ice-tea-500x500.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Orange Drink',
      description: 'Fresh orange juice with a fantastic, refreshing taste to give you a bright start.',
      price: 300,
      discount: 0,
      vendorId: process.env.ADMIN_ID,
      categoryId: 1,
      image: 'https://cdn.cdkitchen.com/images/cats/956/cat-956-720-1.jpg',
      image2: 'https://png.pngtree.com/png-clipart/20190803/ourlarge/pngtree-orange-juice-drink-fresh-fruits-composition-png-image_1657258.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Chocolate Milk',
      description: 'Enjoy a cold glass of chocolate milk. Great recovery drink for you taste buds',
      price: 550,
      discount: 40,
      vendorId: process.env.ADMIN_ID,
      categoryId: 1,
      image: 'https://i0.wp.com/www.nutriziouz.com/wp-content/uploads/2016/06/Chocolate-Chocolate-Milk.jpg?fit=629%2C496&ssl=1',
      image2: 'https://upl.stack.com/wp-content/uploads/Chocolate-Milk-STACK-629x496.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Lemon Juice',
      description: `Lemons are rich in Vitamin C, which is essential for
        maintaining a fully functional immune system, aiding digestion,
        fighting cancer, helping wounds to heal and even helping to prevent heart failure.`,
      price: 250,
      discount: 0,
      vendorId: process.env.ADMIN_ID,
      categoryId: 1,
      image: 'https://sc01.alicdn.com/kf/UTB8ZASSP3QydeJk43PUq6AyQpXa9.jpg',
      image2: 'https://previews.123rf.com/images/magone/magone1512/magone151200040/50356621-glass-of-lemon-juice-and-fresh-lemon-fruit-isolated-on-white-background.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Irish Cream',
      description: `This delicious homemade Irish cream has less fat.
        It tastes pretty nice. It’s way cheaper than buying a bottle!`,
      price: 750,
      discount: 50,
      vendorId: process.env.ADMIN_ID,
      categoryId: 1,
      image: 'https://www.organiclifetips.com/wp-content/uploads/2018/10/Homemade-Baileys-Irish-Cream.jpg',
      image2: 'https://www.belleek.com/Images/Models/Full/3498.Jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Cake',
      description: `The best cake that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 10400,
      discount: 50,
      vendorId: process.env.ADMIN_ID,
      categoryId: 2,
      image: 'https://cdn.shopify.com/s/files/1/2725/9456/products/flavourtown-bakery-london-cakes_vanilla-party_2048x2048.jpg?v=1583340892',
      image2: 'https://www.miette.com/uploads/1/2/5/2/125220153/s987225609974446213_p1050_i1_w550.jpeg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Banana Bread',
      description: `The best banana bread that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 1750,
      discount: 50,
      vendorId: process.env.ADMIN_ID,
      categoryId: 2,
      image: 'https://www.simplyrecipes.com/wp-content/uploads/2014/08/banana-bread-horiz-a-1600.jpg',
      image2: 'https://i0.wp.com/www.mentalforlentils.com/wp-content/uploads/2019/04/Banana-bread-1.jpg?resize=720%2C720&ssl=1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Brownie',
      description: `The best brownie that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 700,
      discount: 50,
      vendorId: process.env.ADMIN_ID,
      categoryId: 2,
      image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/8/13/3/FNM100109HeMadeSheMade007_s4x3.jpg.rend.hgtvcom.826.620.suffix/1371590940923.jpeg',
      image2: 'https://www.sohowsittaste.com/wp-content/uploads/2010/04/brownies.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Bread',
      description: `The best bread that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 350,
      discount: 50,
      vendorId: process.env.ADMIN_ID,
      categoryId: 2,
      image: 'https://butterwithasideofbread.com/wp-content/uploads/2019/07/White-Bread_10.bsb_.jpg',
      image2: 'https://www.jocooks.com/wp-content/uploads/2020/03/white-bread-1.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Cookie',
      description: `The best cookie that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 600,
      discount: 50,
      vendorId: process.env.ADMIN_ID,
      categoryId: 2,
      image: 'https://www.wholesomeyum.com/wp-content/uploads/2017/02/wholesomeyum-the-best-low-carb-keto-chocolate-chip-cookies-recipe-with-almond-flour-12.jpg',
      image2: 'https://thebigmansworld.com/wp-content/uploads/2019/03/flourless-keto-chocolate-chip-cookies3.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Canned Beef',
      description: `The best canned beef that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 600,
      discount: 50,
      vendorId: process.env.ADMIN_ID,
      categoryId: 3,
      image: 'https://previews.123rf.com/images/paulcowan/paulcowan1009/paulcowan100900020/7859800-a-tin-of-corned-beef-or-bully-beef-open-on-a-plate.jpg',
      image2: 'https://itemscatalogue.redcross.int/upload/products_data/images/big/FCANMEAT01.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Canned Sweet Corn',
      description: `The best canned sweet that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 600,
      discount: 50,
      vendorId: process.env.ADMIN_ID,
      categoryId: 3,
      image: 'https://previews.123rf.com/images/izzzy71/izzzy711904/izzzy71190400051/121671566-canned-corn-sweet-corn-in-a-tin.jpg',
      image2: 'https://sc02.alicdn.com/kf/UTB8TW9raVPJXKJkSahVq6xyzFXaV.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Fresh Milk',
      description: `The best milk that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 500,
      discount: 50,
      vendorId: process.env.ADMIN_ID,
      categoryId: 4,
      image: 'https://previews.123rf.com/images/iamnao/iamnao1208/iamnao120800026/14783872-bottle-of-fresh-milk-and-glass-on-a-wooden-table.jpg',
      image2: 'hhttps://www.dairyindustries.com/wp-content/uploads/milk-1-600x400.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Flour',
      description: `The best flour that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 600,
      discount: 50,
      vendorId: process.env.ADMIN_ID,
      categoryId: 5,
      image: 'https://manbakeng.com/wp-content/uploads/2019/03/flour.jpg',
      image2: 'https://www.wikihow.com/images/thumb/e/ee/Make-Flour-Step-2.jpg/v4-460px-Make-Flour-Step-2.jpg.webp',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sugar',
      description: `The best sugar that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 600,
      discount: 50,
      vendorId: process.env.ADMIN_ID,
      categoryId: 5,
      image: 'https://i0.wp.com/media.premiumtimesng.com/wp-content/files/2018/06/sugar.jpg?fit=1280%2C720&ssl=1',
      image2: 'https://live.mrf.io/statics/i/ps/tribuneonlineng.com/wp-content/uploads/2018/02/sugar-new.jpg?width=1200&enable=upscale',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Frozen Chicken',
      description: `The best frozen chicken that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 3400,
      discount: 50,
      vendorId: process.env.ADMIN_ID,
      categoryId: 6,
      image: 'https://ua.all.biz/img/ua/catalog/16606932.jpg',
      image2: 'https://previews.123rf.com/images/ruslan/ruslan1511/ruslan151100055/48317586-frozen-chicken-meat-at-a-market.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Frozen beef',
      description: `The best frozen beef that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 1600,
      discount: 0,
      vendorId: process.env.ADMIN_ID,
      categoryId: 6,
      image: 'https://image.shutterstock.com/z/stock-photo-frozen-beef-slices-in-hoarfrost-close-up-223741525.jpg',
      image2: 'https://cdn.shopify.com/s/files/1/0013/8913/3933/products/familychef_4_frozen_beef_burgers_unpacked.png?v=1561391949',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Pineapple',
      description: `The best Pineapple that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 400,
      discount: 50,
      vendorId: process.env.ADMIN_ID,
      categoryId: 7,
      image: 'https://www.plantgrower.org/uploads/6/5/5/4/65545169/published/pineapple.jpg?1516498929',
      image2: 'https://johnpalinlocal.co.uk/app/uploads/pineapple.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Pumpkin Leaf',
      description: `The best Pumpkin Leaf that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 200,
      discount: 0,
      vendorId: process.env.ADMIN_ID,
      categoryId: 7,
      image: 'https://static.wixstatic.com/media/6427b3_ec66fffb731448ecac1779052b0544a9~mv2_d_3543_3543_s_4_2.jpg/v1/fill/w_480,h_480,al_c,q_85,usm_0.66_1_0.01/6427b3_ec66fffb731448ecac1779052b0544a9~mv2_d_3543_3543_s_4_2.webp',
      image2: 'https://247foods.ng/public/uploads/1594633338-h-250-ugu-bunch.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Water Melon',
      description: `The best water melon that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 500,
      discount: 0,
      vendorId: process.env.ADMIN_ID,
      categoryId: 7,
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.plantgrower.org%2Fwatermelon.html&psig=AOvVaw0L3_9ujKriNyIJWi5E8SnJ&ust=1596132413145000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOiat-GG8-oCFQAAAAAdAAAAABAD',
      image2: 'https://images-na.ssl-images-amazon.com/images/I/91QzUkEs2hL._SL1500_.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Water Leaf',
      description: `The best Water Leaf that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 100,
      discount: 0,
      vendorId: process.env.ADMIN_ID,
      categoryId: 7,
      image: 'https://www.izaronstore.com/wp-content/uploads/2019/03/Water-Leaf-izaron-online-grocery-store-abuja-nigeria-.png',
      image2: 'https://oloja.ng/wp-content/uploads/2017/07/water-leaf-1.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Grapes',
      description: `The best Grapes that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 1200,
      discount: 0,
      vendorId: process.env.ADMIN_ID,
      categoryId: 7,
      image: 'https://www.thepacker.com/sites/default/files/Grapes_Red_web_.jpg',
      image2: 'https://img1.cookinglight.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2015/08/main/1508w-grapes-getty_0.jpg?itok=_vUbtJUc',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Apple',
      description: `The best Apple that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 230,
      discount: 10,
      vendorId: process.env.ADMIN_ID,
      categoryId: 7,
      image: 'https://i5.walmartimages.ca/images/Large/094/514/6000200094514.jpg',
      image2: 'https://i.dailymail.co.uk/1s/2019/07/24/13/16438126-7276481-image-a-3_1563970957529.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Mop Stick',
      description: `The best Mop Stick that is sure to give your household and
        environment a shiny and tidy look`,
      price: 500,
      discount: 0,
      vendorId: process.env.ADMIN_ID,
      categoryId: 8,
      image: 'https://cdn11.bigcommerce.com/s-uzp9ass4j1/images/stencil/1280x1280/products/255/566/169-1695726_stirrup-mop-stick-metal-mop-hd-png-download__92117.1580943705.png?c=1&imbypass=on',
      image2: 'https://qystores.com/images/store/e4ab8.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Detergent',
      description: `The best Detergent that is sure to give your household and
        environment a shiny and tidy look`,
      price: 600,
      discount: 30,
      vendorId: process.env.ADMIN_ID,
      categoryId: 8,
      image: 'https://www.dailyecho.co.uk/resources/images/6350033/?type=responsive-gallery',
      image2: 'https://4.imimg.com/data4/WX/SO/MY-33200989/laundry-detergent-powder-500x500.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sponge',
      description: `The best Sponge that is sure to give your household and
        environment a shiny and tidy look`,
      price: 100,
      discount: 0,
      vendorId: process.env.ADMIN_ID,
      categoryId: 8,
      image: 'https://www.collinsdictionary.com/images/full/sponge_772501450_1000.jpg',
      image2: 'https://imgaz3.staticbg.com/thumb/large/oaupload/banggood/images/CF/21/8def3e72-050e-4798-84f3-4168e6f98b48.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Bucket',
      description: `The best bucket that is sure to give your household and
        environment a shiny and tidy look`,
      price: 800,
      discount: 0,
      vendorId: process.env.ADMIN_ID,
      categoryId: 8,
      image: 'https://image.made-in-china.com/2f0j00zEYRuKdGTtkr/Durable-Construction-Tools-14L-Heavy-Duty-Rubber-Pails-Buckets.jpg',
      image2: 'https://images.uncyclomedia.co/uncyclopedia/en/3/34/Blue_bucket.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Brush',
      description: `The best brush that is sure to give your household and
        environment a shiny and tidy look`,
      price: 400,
      discount: 55,
      vendorId: process.env.ADMIN_ID,
      categoryId: 8,
      image: 'https://images.uline.com/is/image/content/dam/images/H/H4000/H-3536.jpg?$Mobile_Zoom$&iccEmbed=1&icc=AdobeRGB',
      image2: 'https://images.homedepot-static.com/productImages/0ad83ee8-2010-418a-b08c-c8370df5f54d/svn/proline-scrub-brushes-bwk3210-64_1000.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Powder',
      description: 'The best Powder that is sure to give you a shiny and tidy look',
      price: 400,
      discount: 55,
      vendorId: process.env.ADMIN_ID,
      categoryId: 9,
      image: 'https://cdn.shopify.com/s/files/1/1959/4397/products/ClearSkiesPowderCleanser_Pile_1_1_1024x1024.jpg?v=1584439887',
      image2: 'https://massfin.com/wp-content/uploads/2018/04/MFI-Powders.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Body Lotion',
      description: 'The best Powder that is sure to give you a shiny and tidy look',
      price: 1500,
      discount: 55,
      vendorId: process.env.ADMIN_ID,
      categoryId: 9,
      image: 'https://www.suave.com/sk-eu/content/dam/brands/suave/united_states_ofamerica/1224948-us-svb-32oz-bl-advancedtherapy-10867-fop.png.rendition.767.767.png',
      image2: 'https://www.goodlife.co.ke/wp-content/uploads/2020/03/MAKARI-CAROTNIC-EXTREME-LIGHTENIING-CREAM-50ML.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Chin Chin',
      description: `The best chin chin that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 1400,
      discount: 55,
      vendorId: process.env.ADMIN_ID,
      categoryId: 2,
      image: 'https://yucee.biz/wp-content/uploads/2017/03/chin-chin-product-listing.jpg',
      image2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT0eTDetWE_qI9nLjhkkVORhpiYyRbDMZjQdA&usqp=CAU',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Lettuce',
      description: `The best lettuce that is sure to give you 
        the satisfaction that you crave. Rich in its flavour and well prepared to soothe your needs and taste buds.
        Make the best out of this offer.`,
      price: 800,
      discount: 55,
      vendorId: process.env.ADMIN_ID,
      categoryId: 7,
      image: 'https://st1.thehealthsite.com/wp-content/uploads/2019/11/cabbage-leaves-for-a-migraine.jpg?impolicy=Medium_Resize&w=1200&h=800',
      image2: 'https://img.washingtonpost.com/rf/image_480w/2010-2019/WashingtonPost/2014/11/07/Production/Food/Images/SavoyCabbage.jpg?uuid=0eamKmbZEeSDbIO8TybrZw',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Groceries', null, {})
};
