class ProductForm extends HTMLElement {
  constructor() {
    super();   

    this.form = this.querySelector('form');
    this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
    this.cartNotification = document.querySelector('cart-notification');
  }

  onSubmitHandler(evt) {
    evt.preventDefault();
    this.cartNotification.setActiveElement(document.activeElement);
    
    const submitButton = this.querySelector('[type="submit"]');

    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('loading');

    const body = JSON.stringify({
      ...JSON.parse(serializeForm(this.form)),
      sections: this.cartNotification.getSectionsToRender().map((section) => section.id),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_add_url}`, { ...fetchConfig('javascript'), body })
    .then((response) => response.json())
    .then((parsedState) => {
//         console.log(parsedState);
      //       mini cart section render
      fetch('/?sections=cart-items')
      .then((response) => response.json())
      .then((data) => {
      
//         document.getElementById("CartCount").innerHTML= data.item_count;
        var SectionHtml = data['cart-items'] ;
        var IDminiCart = document.getElementById("mini-cart");
        var IDminiCartMask = document.getElementById("minibag_mask");
        IDminiCart.innerHTML = SectionHtml;
        IDminiCart.classList.add("show-minibag");
        IDminiCart.classList.remove("hide-minibag");
//         document.body.style.overflow = "hidden";
        IDminiCartMask.style.display = 'block';
        

      });
      console.log("notification off");
              this.cartNotification.renderContents(parsedState);
    })
    
    .catch((e) => {
      console.error(e);
    })
      .finally(() => {
        submitButton.classList.remove('loading');
        submitButton.removeAttribute('disabled');
      });
  }
}

customElements.define('product-form', ProductForm);

// Added by Divy Start
// Btn Plus Click event to prevent click for more than available quantity

$('.btn-plus').on('click',function(){
  var osQty = $('#qty_inventory_track').html();
  var qtyInput = $('.quantity__input').val();
  
  if($("#qty_inventory_track").length == 0) {
	var osQty = $('.inventory-container p strong').html();
  }
  
  if($('.inventory-container').hasClass('out-of-stock')){
  	$('.quantity__input').val(1);
    return false;
  }
  
  if(qtyInput > parseInt(osQty)){
    $('.quantity__input').val(osQty);
  	return false;
  }
	
})
// Added by Divy End
