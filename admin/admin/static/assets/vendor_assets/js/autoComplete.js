(function ($) {

    // let data = [
        
    //     'Auto Complate Customized',
    //     'Bootstrap Desing UI',
    //     'Auto Complate Pattern',
    //     'Html Dashboard',
    //     'Desing UI'
    // ]
    // const autoCompleteInputs = document.querySelectorAll('.autoComplete-input');
    // // const suggestionBox = document.querySelector('.suggestion-dropdown');

    // function autoComplate(dataToMatch){
    //     let returnData = [];
    //     data.map(result =>{
    //         // (dataToMatch === result.slice(0,dataToMatch.length) ? returnData.push(result) : '')
    //         if(result.toUpperCase().slice(0,dataToMatch.length) === dataToMatch || result.toLowerCase().slice(0,dataToMatch.length) === dataToMatch){
    //             returnData.push(result)
    //         }
    //     });
        
    //     return returnData;

    // }
    // function showMatches(e){
    //     let value = this.value;
    //     const targetImg = e.target;
    //     // console.log((this.nextElementSibling));
    //     const suggestionBox = this.parentElement.nextElementSibling;
    //     console.log(value);
    //     // if no value
    //     if(value.length > 0){
    //         let dataToShow = [];
    //         suggestionBox.innerHTML = '';

    //         dataToShow = autoComplate(value);

    //         const displayMarkup = dataToShow.map(result => {
    //             return `
    //                 <li><a href="#">${result}</a></li>
    //             `;
    //         }).join('');
    //         suggestionBox.style.display = 'block';
    //         suggestionBox.innerHTML = displayMarkup;
    //     }else{
    //         dataToShow = [];
    //         suggestionBox.innerHTML = '';
    //         suggestionBox.style.display = 'none';
    //     }
    // }

    // autoCompleteInputs.forEach(autoCompleteInput => autoCompleteInput.addEventListener('change',showMatches));
    // autoCompleteInputs.forEach(autoCompleteInput => autoCompleteInput.addEventListener('keyup',showMatches));

    // const autoCompleteBasics = document.querySelectorAll('.autoComplete-basic');

    // let value = [];
    // function findMatches(){
    //     const suggestionBox = this.parentElement.nextElementSibling;
    //     value = [
    //         this.value,
    //         this.value+this.value,
    //         this.value+this.value+this.value
    //     ]
    //     console.log(value);
    //     let id = 0;
    //     const displayMarkup = value.map(result => {
    //         ++id;
    //         return `
    //             <li class="list-${id}"><a href="#">${result}</a></li>
    //         `;
    //     }).join('');
        
    //     suggestionBox.style.display = 'block';
    //     suggestionBox.innerHTML = displayMarkup;
    // }

    
    // selectLists.forEach(selectList => selectList.addEventListener('click',setValue));
    // autoCompleteBasics.forEach(autoCompleteBasic => autoCompleteBasic.addEventListener('input',findMatches));


})(jQuery);