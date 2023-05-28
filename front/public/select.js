
	$('#select').select2({
       placeholder: 'Select an option',    
         language: {
             noResults: function() {
            return `<button style="width: 100%" type="button"
            class="btn btn-primary" 
            onClick='task()'>+ Add New Item</button>
            </li>`;
            }
         },
       
        escapeMarkup: function (markup) {
            return markup;
        }
    });
    
 const  task=()=>
  {
  alert("Hello world! ");
  }


