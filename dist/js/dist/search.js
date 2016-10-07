 $(function () {
      function renderList() {
      var pic = $('.search__box__input').val();
        var API_KEY = '2671443-f70b44031fad9176b9185b139';
        $.ajax({
            url: "https://pixabay.com/api/?key=" + API_KEY + "&q=" + pic + "&per_page=7&lang=ru",
            success: function(data) {
                // pic = 'men';
              if ( parseInt(data.totalHits) === 0)  {
                return false;
              } else 
                // console.log(data);
                var piclist = tmpl($('#grid-template').html(), data);
                $('.grid').remove();

                $('.activity-grid').append(piclist);
                 $('.grid').masonry({
                   // options
                   itemSelector: '.grid__item',
                   columnWidth: 300
                });

            }
        });
    }

    $('#search__form').submit(function(e) {
        e.preventDefault();
        renderList();

    });

    renderList();

 });