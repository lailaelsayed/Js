var inputName = document.getElementById('Name');
var inputUrl = document.getElementById('url');
var warningDiv1 = document.getElementById('warning1');    
var warningDiv2 = document.getElementById('warning2'); 
var buttonValue = document.getElementById('submit');

var bookmarkArray = [];     // array of object [{bookmarkes}]


// get array from localstorage to bookmarkArray then display it 
if(localStorage.getItem('bookmarkes')!=null){
    bookmarkArray=JSON.parse(localStorage.getItem('bookmarkes'));
    display(bookmarkArray);
}


// fuction add => eventlistener onclick  (submit button)
function add(){ 
    
    if(validation() == 'okay'){     //inputName.value => true && inputurl.value => true
        var bookmark = {
            name:inputName.value,
            url:inputUrl.value,
        }
             // check button(submit or update) =>submit 
         if(buttonValue.innerHTML=='Submit')  {  
            bookmarkArray.push(bookmark);
            var check= 'notFound';  //  هتأكد الاول اللى هضيفه موجود قبل كده ولا لأ؟
            for(var i= 0 ;i<bookmarkArray.length-1 ; i++){
                if((bookmark.name == bookmarkArray[i].name)&&(bookmark.url == bookmarkArray[i].url)){
                    bookmarkArray.pop();
                    warningDiv1.classList.remove('d-none');
                    warningDiv1.innerHTML ='this url already exist';
                    warningDiv2.classList.add('d-none');
                    check='found';      
                }
                else if((bookmark.name == bookmarkArray[i].name) && (bookmark.url != bookmarkArray[i].url) ){
                    bookmarkArray.pop();
                    warningDiv1.classList.remove('d-none');
                    warningDiv1.innerHTML ='this name already exist';
                    warningDiv2.classList.add('d-none');
                    check='found';
                }
                else if((bookmark.name != bookmarkArray[i].name) && (bookmark.url == bookmarkArray[i].url) ){
                    bookmarkArray.pop();
                    warningDiv1.classList.remove('d-none');
                    warningDiv1.innerHTML ='this url already exist';
                    warningDiv2.classList.add('d-none');
                    check='found';
                }
            }

            if(check == 'notFound'){
                localStorage.setItem('bookmarkes',JSON.stringify(bookmarkArray));
                display(bookmarkArray);
                clear(); 
                warningDiv1.classList.add('d-none');
                warningDiv2.classList.add('d-none');
                }
         }


            // check button(submit or update) =>update
         else{

            var check= 'notFound'; // هتأكد من اللي هدخله موجود قبل كده ولا لأ
            for(var i= 0 ;i<bookmarkArray.length ; i++){
                if((bookmark.name == bookmarkArray[i].name)&&(bookmark.url == bookmarkArray[i].url)){
                    check='found';
                    warningDiv1.classList.remove('d-none');
                    warningDiv1.innerHTML ='this url already exist';
                    warningDiv2.classList.add('d-none');
                    buttonValue.innerHTML='submit';
                }
                else if((bookmark.name == bookmarkArray[i].name) && (bookmark.url != bookmarkArray[i].url) ){
                    check='found';
                    warningDiv1.classList.remove('d-none');
                    warningDiv1.innerHTML ='this name already exist';
                    warningDiv2.classList.add('d-none');
                    buttonValue.innerHTML='submit';

                }
                else if((bookmark.name != bookmarkArray[i].name) && (bookmark.url == bookmarkArray[i].url) ){
                    check='found';
                    warningDiv1.classList.remove('d-none');
                    warningDiv1.innerHTML ='this url already exist';
                    warningDiv2.classList.add('d-none');           
                    buttonValue.innerHTML='submit';
                }
            }

                if(check=='notFound'){
                    bookmarkArray.splice(globalIndex,1,bookmark);
                    buttonValue.innerHTML='submit';
                    localStorage.setItem('bookmarkes',JSON.stringify(bookmarkArray))    
                    console.log(bookmarkArray);
                    display(bookmarkArray);
                    clear(); 
                    warningDiv1.classList.add('d-none');
                    warningDiv2.classList.add('d-none');
            }

         }
    }



    else if(validation() =='no'){      //inputName.value => false && inputurl.value => false
         warningDiv1.classList.remove('d-none');
         warningDiv1.innerHTML ='Name is required';
         warningDiv2.classList.remove('d-none');
         warningDiv2.innerHTML ='Url Field is required';    
      
    }


    else if(validation() == 'onlyName'){     //inputName.value => true && inputurl.value => false
        warningDiv1.classList.remove('d-none');
        warningDiv1.innerHTML ='this url already exist';
        warningDiv2.classList.remove('d-none');
        warningDiv2.innerHTML ='Url Field is required';
        
        
    }



    else if(validation()== 'onlyUrl'){      //inputName.value => false && inputurl.value => true
        warningDiv1.classList.remove('d-none');
        warningDiv1.innerHTML ='Name is required';
       
    }


}


// function dispaly bookmarkArray
function display(arr){
    var str ='';
    for(var i=0 ; i<arr.length  ; i++ ){

         str+=`<div class="test d-flex mainfont my-4 py-4 px-2">
                 <h3 class=" w-25">${arr[i].name}</h3>
                 <a href="${arr[i].url}" class="btn btn-primary pt-2 px-3" target="_blank">visit</a>
                 <button class="btn btn-danger ms-2" onclick="del(${i})">Delete</button>
                 <button onclick="update(${i})"class="btn btn-outline-warning  ms-2" >Update</button>
            </div>`
    }
    
        document.getElementById('container').innerHTML=str;
}

// function update element from array
var globalIndex;
function update (index){
    inputName.value = bookmarkArray[index].name;
    inputUrl.value = bookmarkArray[index].url;
    buttonValue.innerHTML="Update";
    globalIndex = index;
    warningDiv1.classList.add('d-none');
    warningDiv2.classList.add('d-none');
}

// function delete element from array
function del(index){
    bookmarkArray.splice(index,1);
    localStorage.setItem('bookmarkes',JSON.stringify(bookmarkArray));
    display(bookmarkArray);
}


//function clear formValue 
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























   
