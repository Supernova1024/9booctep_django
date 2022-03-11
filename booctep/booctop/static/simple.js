function showpdfdoc(PDFJS,pathtopdf){


 	var loadingTask = PDFJS.getDocument(pathtopdf);
		loadingTask.promise.then(
		  function(pdf) {
		    // Load information from the first page.
		    pdf.getPage(1).then(function(page) {
		      var scale = 1;
		      var viewport = page.getViewport(scale);

		      // Apply page dimensions to the <canvas> element.
		      var canvas = document.getElementById("pdf");
		      var context = canvas.getContext("2d");
		      canvas.height = viewport.height;
		      canvas.width = viewport.width;

		      // Render the page into the <canvas> element.
		      var renderContext = {
		        canvasContext: context,
		        viewport: viewport
		      };
		      page.render(renderContext).then(function() {
		        console.log("Page rendered!");
		      });
		    });
		  },
		  function(reason) {
		    console.error(reason);
		  }
		);


 }
