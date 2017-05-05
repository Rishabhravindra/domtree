//create higher order function to create html for the file structure
let createDOM = (function() {

   //intitial boilerplate html for heading	
   let html = "<h2 class='modal-title'>DOM Tree <span class='btn-close'><i class='fa fa-times' aria-hidden='true'><\/i><\/span><\/h2><h2 class='search-bar'>Search<\/h2>",
       level = 0;

   //return a function that has the html code for one level    
   return function(node, n) {
   	   //loop through levels to create space based on the hierarchical postion of the element 
       for (var i = 0; i < level; i++) {
           html += '<span class="align-elem"></span>';
       }

       //sub level with a sheet icon if nodetype has nested text
       if (node.nodeName.toLowerCase() == "p") {
           // create html for para folder
           html += '<span class = "elem"><i class="fa fa-minus-square-o" aria-hidden="true"><\/i><i class="fa fa-folder-o" aria-hidden="true"><\/i>'
                    + node.nodeName.toLowerCase()
                    + '<\/span>';
           html += '<br>';

           for (var i = 0; i < level; i++) {
               html += '<span class="align-elem"></span>';
           }

           // html for text content in the parent node
           html += '<span class="align-elem"></span><span class = "elem"><i class="fa fa-file-text-o" aria-hidden="true"><\/i>'
            	   + node.textContent.toLowerCase()
            	   + '<\/span>';
       } else {
           html += '<span class = "elem"><i class="fa fa-minus-square-o" aria-hidden="true"><\/i><i class="fa fa-folder-o" aria-hidden="true"><\/i>'
           		+ node.nodeName.toLowerCase()
           		+ '<\/span>';
       }
       html += '<br>';
       level++;
   	   
   	   // loop through the html tags and generate code till the smallest child is reached 	    
       [].forEach.call(node.children, function(node, numChild) {
           createDOM(node, numChild);
       });

       level--;
       return html;
   };
})();

// generate html through DOM manipulation and display itin the modal box
document.getElementById('display-modal').innerHTML = createDOM(document.documentElement);