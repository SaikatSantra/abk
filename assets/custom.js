function HideFunction() {
  var IDminiCart = document.getElementById("mini-cart");
  var IDminiCartMask = document.getElementById("minibag_mask");
  IDminiCart.classList.remove("show-minibag");
  IDminiCart.classList.add("hide-minibag");
  document.body.style.overflow = "auto";
  IDminiCartMask.style.display = 'none';
}

function ShowFuntion(IDminiCart,IDminiCartMask) {
  IDminiCart.classList.add("show-minibag");
  IDminiCart.classList.remove("hide-minibag");
  document.body.style.overflow = "hidden";
  IDminiCartMask.style.display = 'block';
}

// Hearder icon hover
const container = document.querySelector('.header__icon--cart');
const showView = (event) => {
  event.preventDefault();
  console.log('show');
  //mini cart section render
  fetch('/?sections=cart-items')
  .then((response) => response.json())
  .then((data) => {
    var SectionHtml = data['cart-items'] ;
    var IDminiCart = document.getElementById("mini-cart");
    var IDminiCartMask = document.getElementById("minibag_mask");
    IDminiCart.innerHTML = SectionHtml;
    ShowFuntion(IDminiCart,IDminiCartMask);
  });
}
container.onclick = showView;



// Item remove
function updateItemById(id,quantity,sections) {
  let formData = {
    'id': id,
    'quantity': quantity,
    'sections':sections
  };
 console.log(JSON.stringify(formData));
  fetch('/cart/change.js', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    if(data.item_count > 0){
    document.querySelector(".cart-count-bubble").innerHTML = `<span aria-hidden="true">${ data.item_count}</span><span class="visually-hidden">${data.item_count} item</span>`;
    }else{ 
    document.querySelector(".cart-count-bubble").innerHTML = ``;
    }
      
    var sectionHtmlData =  data; 
    var SectionHtml = sectionHtmlData.sections['cart-items'] ;
    var IDminiCart = document.getElementById("mini-cart");
    console.log(SectionHtml);
    IDminiCart.innerHTML = SectionHtml;     
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


jQuery(function($){
  console.log('work');
  $( "summary.header__menu-item#hover-enable span" ).mouseenter(function() {
    console.log('hover');
    $(this).parents('details').attr('open','open');
//      $(this).parents('.hover-nav.hover-enable').siblings().children('details ul').removeClass('header__submenu_hover');
//     $(this).parents('details').children('ul').addClass('header__submenu_hover');
   
  });

//   $( "summary.header__menu-item#hover-enable span" ).mouseleave(function() {
//     console.log('hover');
//     $(this).parents('details').attr('open','open');
//     $(this).parents('.hover-nav.hover-enable').siblings().children('details ul').removeClass('header__submenu_hover');
//     $(this).parents('details').children('ul').addClass('header__submenu_hover');
//   });

  $( ".list-menu li a.no-sub" ).mouseenter(function() {
    console.log('hover');
    $('details').removeAttr('open','open');
//     $('details ul').addClass('header__submenu_hover');
  });
  
  $( "#hover-enable details ul" ).mouseleave(function() {
    $(this).parents('details').removeAttr('open','open');
//      $(this).removeClass('header__submenu_hover');
  });

});