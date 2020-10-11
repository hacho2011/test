function searchBtn(){
    let dim = document.getElementById('search-wrapper');

    if(dim.classList.contains('active')){
        dim.classList.remove('active');
    }else {
        dim.classList.add('active');
    }
    
}