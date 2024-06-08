var data = [
  {
    url: 'images/51j6OH4qYhL_SS100_.jpg',
    link: '//www.amazon.com/gp/product/1628600837/ref=ox_sc_act_title_1?ie=UTF8&psc=1&smid=ATVPDKIKX0DER',
    title:
      'Becoming a Supple Leopard 2nd Edition: The Ultimate Guide to Resolving Pain, Preventing Injury, and Optimizing Athletic Performance',
    price: 59.95,
    quantity: 1,
  },
  {
    url: 'images/41ophY78M2L_SS100_.jpg',
    link: '//www.amazon.com/gp/product/0062190377/ref=ox_sc_act_title_2?ie=UTF8&psc=1&smid=ATVPDKIKX0DER',
    title: 'Seveneves: A Novel',
    price: 35.0,
    quantity: 1,
  },
  {
    url: 'images/6195J3AhbdL_SL500_SY135_.jpg',
    link:
      '//www.amazon.com/The-Whole30-30-Day-Health-Freedom/dp/0544609719/ref=pd_cart_recs_2_2_p?ie=UTF8&refRID=0C2KPAAFEMW69ZXA0XBN',
    title: 'The whole 30: The 30 Days Guild to Total Healthy and Food Freedom',
    price: 30.0,
    quantity: 1,
  },
];
var locale = { total: 'Total', items: 'items', totalSavings: 'Total savings' };
var cols = [
  {
    id: 'productImage',
    caption: '',
    dataField: 'productImageUrl,productLink,productTitle',
    presenter: '<img class="product-item-image-resize" src="\{{=it.productImageUrl}}" alt="\{{=it.productTitle}}">',
  },
  {
    id: 'productTitle',
    caption: 'Title',
    dataField: 'title',
  },
  {
    id: 'productPrice',
    caption: 'Price',
    dataField: 'price',
    format: '$#,##0.00',
  },
  {
    id: 'productQuantity',
    caption: 'Quantity',
    dataField: 'quantity',
    presenter:
      '<input min="0" value="\{{=it.productQuantity}}" type="number" style="width:100%;" oninput="refreshQuantity(this)" />',
  },
  {
    id: 'productDelete',
    action: [
      {
        name: 'delete',
        presenter:
          '<div data-action = "delete" style = "background-color:red;color:white;width:80px;height:100%;position:relative"><span style = "position:absolute;left:30%;top:40%">Delete</span></div>',
        handler: deleteRow,
      },
    ],
    width: 80,
    swipeDirection: 'left',
  },
  {
    id: 'productSubtotal',
    caption: 'Subtotal',
    dataField: '=[productPrice] * [productQuantity]',
    visible: false,
  },
  {
    id: 'productImageUrl',
    visible: false,
    dataField: 'url',
  },
  {
    id: 'productLink',
    visible: false,
    dataField: 'link',
  },
  {
    id: 'discountThreshold',
    visible: false,
    dataField: 'discountThreshold',
  },
];
