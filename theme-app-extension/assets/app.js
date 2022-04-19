const ord_domain = document.location.hostname;
console.log("hello");
// append jquery link
var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po, s);
// end 

(function() {
        setTimeout(() => {
            $.ajax ({
                url: `https://6580-122-170-106-103.ngrok.io/shop-app-active-status-frontend?shop=${ord_domain}`,
                type: "GET",
                beforeSend: function(xhr){xhr.setRequestHeader('Accept', '*/*');},
                success:  function(data) {  
                  if (data.app_status == 'Disabled') {
                     return; 
                  }else{
                    // $('head').append('<link href="https://6580-122-170-106-103.ngrok.io/newapp.css" rel="stylesheet" crossorigin="anonymous">');
                    $('body').append('<button class="btn wigets_btn" id="app_btn" onclick="onclickAppbutton();">orderTrack</button>')
                    appendApp();
                  }
                    
                }
            });
            
        }, 1000);
})();

 function  appendApp (open) {    
    $(document).ready(function() {
        $.ajax ({
            url: "https://6580-122-170-106-103.ngrok.io/wigets-index",
            type: "GET",
            beforeSend: function(xhr){xhr.setRequestHeader('Accept', '*/*');},
            success:  function(data) { 
                // console.log(data); 
                if (data) {
                    $('body').append(data);
                    pagebackArrow();
                    if (open == 'open') {
                        $(".wigets_app").addClass('open');   
                    }
                }
                
            }
        });
        
        });      
    

};  
function pagebackArrow() {
    const className = $('#page').attr('page'); 
    // console.log(className)
    if (className == 'main_index_body') {
      $('.back_arrow').hide();  
    }else{
        $('.back_arrow').show();
    };
    
};

function onclickBackArrow() {
  $('#app_bussinebot').remove();
  const open = "open";
  appendApp(open);
};

const getRewardData = async () => { 
    return new Promise((resolve, reject) => {
    $('#page').attr('page', 'get_reward_body');
    $('#app_index_body').empty();
        $('#app_spinner').show();
  
        $.ajax({
            url: "https://6580-122-170-106-103.ngrok.io/get-reward-point",
            type: "GET",
            beforeSend: function(xhr){xhr.setRequestHeader('Accept', '*/*');},
            success: function(data) { 
                // console.log(data); 
                if (data) {
                    $('#app_index_body').append(data);
                    pagebackArrow();
                    $('#app_spinner').hide();
                    resolve(true)
                }
            }
         });     
        })   
};

function checkrewardtPage() {
    $('#page').attr('page', 'check_point_body');
    
    $('#app_index_body').empty();
        $('#app_spinner').show();
  
        $.ajax({
            url: "https://6580-122-170-106-103.ngrok.io/check-reward-point",
            type: "GET",
            beforeSend: function(xhr){xhr.setRequestHeader('Accept', '*/*');},
            success: function(data) { 
                // console.log(data); 
                if (data) {
                    $('#app_index_body').append(data);
                    pagebackArrow();
                    $('#app_spinner').hide();
                }
            }
         });      
};

const whatsappPage = () => { 
    window.open('https://api.whatsapp.com/send?phone=9999999999');
};

const faqPageData = async () => { 
    return new Promise((resolve, reject) => {
$('#page').attr('page', 'track_oder_body');
$('#app_index_body').empty();    
$('#app_spinner').show();
$.ajax({
    url: "https://6580-122-170-106-103.ngrok.io/faq-page",
    type: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader('Accept', '*/*');},
    success: function(data) { 
      //   console.log(data); 
        if (data) {
            $('#app_index_body').append(data);
            pagebackArrow();
            resolve(true);
            // $('#app_spinner').hide();
            $('#app_index_body').hide();
        }
    }
 });
});
};


function trackorderPage() {
 $('#page').attr('page', 'track_oder_body');
    
  $('#app_index_body').empty();
      $('#app_spinner').show();

      $.ajax({
          url: "https://6580-122-170-106-103.ngrok.io/track-order",
          type: "GET",
          beforeSend: function(xhr){xhr.setRequestHeader('Accept', '*/*');},
          success: function(data) { 
            //   console.log(data); 
              if (data) {
                  $('#app_index_body').append(data);
                  pagebackArrow();
                  $('#app_spinner').hide();
              }
          }
       });   
};

function onclickAppbutton(params) {
    $(".wigets_app").toggleClass("open"); 
};

const getPointReward = async (data) => { 
    $('#app_spinner').show();    
    const result = await getRewardData();

     if (result == true) {
        const reward_point = data.money;
        // console.log(data);
       $('.user_point').empty();
       $('.user_point').append(reward_point);
       $('.user_point').append('<p><b>Nice!!</b> You can now generate a coupon code using available points</p>');
       $('#app_spinner').hide();  
    }
    
 };

const getcodeData = async(data) => { 
    return new Promise((resolve, reject) => {
        $('#page').attr('page', 'code_discount_body');
        $('#app_index_body').empty();
            $.ajax({
                url: "https://6580-122-170-106-103.ngrok.io/get-code-dicount",
                type: "GET",
                beforeSend: function(xhr){xhr.setRequestHeader('Accept', '*/*');},
                success: function(data) { 
                    // console.log(data); 
                    if (data) {
                        $('#app_index_body').append(data);
                        pagebackArrow();
                        $('#app_spinner').hide();
                        resolve(true)
                    }
                }
             });     
            })   
   

};

const getrewardCode = async(data) => { 
    $('#app_spinner').show();   
    const result =   await getcodeData(data);
    if (result == true) {
        $('#copyClipboard').attr('value',`${data.code}`);
    }
 }
 const faqPage =  async() => { 
    const result =   await faqPageData(); 
    if (result == true) {

        $.ajax({
            url: `https://wmt7gctnoc.execute-api.us-east-2.amazonaws.com/default/ShopifyAppProxy?client_id=https://test-store-bob.myshopify.com&type=faq`,
            type: "GET",
           beforeSend: function(xhr){xhr.setRequestHeader('Accept', '*/*');},
           success: function(data) {
                if (data) {
                    getfaqdata(data);
                }
             }
    });

    }
  };

 const  getfaqdata= (data) => { 
    const faqArray = data.faq;
    $.map( faqArray, function( val, i ) {
        $('.faq_body').append(`<div class="que" id="que${i}" onclick="faqOnclick(${i})"> <h6>${val.question}</h6> <span>${val.answer}</span> </div>`)
      });
      $('#app_spinner').hide();
      $('#app_index_body').show();

}
const faqOnclick = (i) => { 
    $(`#que${i} span`).toggleClass("open"); 
};

