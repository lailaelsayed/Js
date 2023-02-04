var inputName = document.getElementById('Name');
var inputUrl = document.getElementById('url');
var warningDiv1 = document.getElementById('warning1');
var warningDiv2 = document.getElementById('warning2');
var warningDiv3 = document.getElementById('warning3');

var bookmarkArray = [];






if(localStorage.getItem('bookmarkes')!=null){
    bookmarkArray=JSON.parse(localStorage.getItem('bookmarkes'));
    display(bookmarkArray);
}




function add(){ 
     
    if(validation() == 'okay'){
        var bookmark = {
            name:inputName.value,
            url:inputUrl.value,
        }
        bookmarkArray.push(bookmark);
        localStorage.setItem('bookmarkes',JSON.stringify(bookmarkArray))    
        console.log(bookmarkArray);
        display(bookmarkArray);
        clear(); 
        if(!warningDiv1.classList.contains('d-none')){
            warningDiv1.classList.add('d-none');
        }
        if(!warningDiv2.classList.contains('d-none')){
            warningDiv2.classList.add('d-none');
        }
        if(!warningDiv3.classList.contains('d-none')){
            warningDiv3.classList.add('d-none');
        }
    }
    else if(validation() =='no'){
        warningDiv1.classList.remove('d-none');
        warningDiv2.classList.add('d-none');
        warningDiv3.classList.remove('d-none');
    }
    else if(validation() == 'onlyName'){
        warningDiv1.classList.add('d-none');
        warningDiv2.classList.remove('d-none');
        warningDiv3.classList.remove('d-none');
    }
    else if(validation()== 'onlyUrl'){
        warningDiv2.classList.add('d-none');
        warningDiv1.classList.remove('d-none');



        //warningDiv3.classList.add('d-none'); ????
   }


}



function display(arr){
    var str ='';
    for(var i=0 ; i<arr.length  ; i++ ){

         str+=`<div class="test d-flex mainfont my-4 py-4 px-2">
                 <h3 class=" w-25">${arr[i].name}</h3>
                 <a href="${arr[i].url}" class="btn btn-primary pt-2 px-3" target="_blank">visit</a>
                 <button class="btn btn-danger ms-2" onclick="del(${i})">Delete</button>
            </div>`
    }
    
        document.getElementById('container').innerHTML=str;
}

function del(index){
    bookmarkArray.splice(index,1);
    localStorage.setItem('bookmarkes',JSON.stringify(bookmarkArray));
    display(bookmarkArray);
}

function clear(){
    inputName.value='';
    inputUrl.value='';


}

var regex = /./;


function validation(){
   
    if(  (regex.test(inputName.value)==true) && (regex.test(inputUrl.value)== true) ){
        return'okay'; //الاسم واللينك دخلوا
    }
    else if ( (regex.test(inputName.value)==false) && (regex.test(inputUrl.value)== false) ){
        return 'no' //الاسم واللينك مدخلوش
    }
    else if( (regex.test(inputName.value)==true) && (regex.test(inputUrl.value) == false)){
        return'onlyName'   //الاسم بس اللى دخل 
    }
    else if((regex.test(inputName.value)==false) && (regex.test(inputUrl.value) == true)){
        return 'onlyUrl'   //اللينك فقط اللي دخل 
    }
}























   
