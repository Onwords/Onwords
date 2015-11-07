describe('Annotation sidebar', function() {
  this.timeout(4000);
  it('should highlight quote after creating annotation', function() {
    page.open('http://www.propublica.org/article/terror-in-little-saigon-vietnam-american-journalists-murdered', function(status) {
      console.log('status', status);
      if (status === 'success') {
        page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function() {
          page.injectJs('../dist/js/main.js');
          page.injectJs('../annotator-original.js');
          var title = page.evaluate(function() {
            return document.title;
          })
          console.log(title);
        })
      } 
    })
  });
  it('should immediately render comment after creating annotation', function() {

  });
})