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
var layout = new GC.DataViews.GridLayout({
  rowHeight: 127,
  showRowHeader: false,
  allowColumnReorder: false,
  allowColumnResize: false,
  allowSwipe: true,
  colHeaderHeight: 24,
  rowTemplate: '#rowTmpl',
});
var dataView = new GC.DataViews.DataView(document.getElementById('grid'), data, cols, layout);
refreshTotalPrice(); // focus data.view by default

document.getElementById('grid').focus();

function refreshTotalPrice() {
  var formulaStringTotal = 'if(sum([productSubtotal]) > 199.99, sum([productSubtotal]) * 0.6, sum([productSubtotal]))';
  var formulaStringPrice = 'sum([productSubtotal])';
  var formulaStringQuantity = 'sum([productQuantity])';
  var total = dataView.data.evaluate(formulaStringTotal);
  var price = dataView.data.evaluate(formulaStringPrice);
  var saving = price - total;
  var quantity = dataView.data.evaluate(formulaStringQuantity);
  var totalPriceSpan = document.getElementById('total');
  var savingPercentage = price === 0 ? 0 : ((saving / price) * 100).toFixed(0);
  totalPriceSpan.innerHTML = '\n<div>\n    <span style="font-size: 16px; font-weight: bold">\n      <span>'
    .concat(locale.total, ' (')
    .concat(quantity, ' ')
    .concat(locale.items, '): </span>\n      <span style="color:green">$')
    .concat(total.toFixed(2), '</span>\n    </span>\n</div>\n<div>\n    <span>')
    .concat(locale.totalSavings, ': </span>\n    <span style="color:green">$')
    .concat(saving.toFixed(2), '</span>\n    ')
    .concat(price === 0 ? '' : '<span>('.concat(savingPercentage, '%)</span>'), '\n</div>');
}

function deleteRow(args) {
  var answer = confirm('Are you sure to delete row?');

  if (answer) {
    dataView.data.removeDataItems(args.hitInfo.row);
    dataView.invalidate();
    refreshTotalPrice();
  }

  args.closeActionColumnPanel();
}

window.refreshQuantity = function refreshQuantity(input) {
  var row = $(input).closest('.gc-row');
  var rowIndex = row[0].id.substr(''.concat(dataView.uid, '-r').length);
  var rowData = data[rowIndex];

  if (rowData) {
    rowData.quantity = input.value ? parseInt(input.value, 10) : 0;
    dataView.data.reCalculate();
    refreshTotalPrice();
  }
};
