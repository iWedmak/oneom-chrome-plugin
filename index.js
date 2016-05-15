var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

$( document ).ready(function() {
    $('.incoming').attr('key', 'plugin').attr('tpl-get', chrome.runtime.id);
    var script = document.createElement('script');
    script.textContent = '(' +  function () { 
        plugin= $('.incoming').attr('tpl-get') ;
        oneParser.setId(plugin);
        } + ')();';
    (document.head||document.documentElement).appendChild(script); //inject in controller what we have plugin on user side
    /*
    var script = document.createElement('script');
    script.textContent = '(' +  function () { 
        var scope=angular.element($('[ng-controller=OnlineCtrl]')).scope();
        scope.$apply(function() 
        {
            //scope.plugin=document.write(chrome.runtime.id);
            //console.log(eval(chrome.runtime.id));
        });
        } + ')();';
    (document.head||document.documentElement).appendChild(script); //inject in controller what we have plugin on user side
    //*/
    /*
    $(".search_online").on("click", function($event)
    {
        var search_url='http://vodlocker.com/?sort_order=down&sort_field=file_id&k={searchString}&per_page=20&data_name=&op=search&page={page}';
        search_url = search_url.replace(/{searchString}/gi, $('h3.panel-title').text());
        search_url = search_url.replace(/{page}/gi, 1);
        var result=[];
        chrome.runtime.sendMessage
        (
            {
                method: 'GET',
                action: 'xhttp',
                url: search_url
            }, 
                function(responseText) 
                {
                    $(responseText).find('table.vlist tr').each(function( index ) {
                        [days, views]=$( this ).find('td:nth-child(2)').find('div').not('[class]').first().text().split('|');
                        result.push({
                            source:'VodLocker',
                            url:$( this ).find('a').first().attr('href'),
                            title:$( this ).find('div.link').first().text(),
                            poster:$( this ).find('a').first().css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,''),
                            duration:$( this ).find('span').first().text(),
                            file:false,
                            screen_map:$( this ).find('a').first().css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'').replace(/_t/,'0000'),
                            views:views.replace(/\D/g, ''),
                            uploaded:days.replace(/\D/g, ''),
                        });
                    });;
                    console.log(result);
                    $('.search_online').attr('tpl-get', JSON.stringify(result)).attr('tpl-name', 'videos');
                    var script = document.createElement('script');
                    script.textContent = '(' +  function () { 
                        var scope=angular.element($('[ng-controller=OnlineCtrl]')).scope();
                        scope.$apply(function() 
                        {
                            scope.templateURL='video_search_result';
                            scope.videos = JSON.parse(angular.element('[tpl-name=videos]').attr('tpl-get'));
                        });
                        } + ')();';
                    (document.head||document.documentElement).appendChild(script);
                }
        );
    });
    //*/
    /*
    $(".search_torrent").on("click", function($event)
    {
        var search_url='http://vodlocker.com/?sort_order=down&sort_field=file_id&k={searchString}&per_page=20&data_name=&op=search&page={page}';
        search_url = search_url.replace(/{searchString}/gi, $('h3.panel-title').text());
        search_url = search_url.replace(/{page}/gi, 1);
        var result=[];
        chrome.runtime.sendMessage
        (
            {
                method: 'GET',
                action: 'xhttp',
                url: search_url
            }, 
                function(responseText) 
                {
                    $(responseText).find('table.vlist tr').each(function( index ) {
                        [days, views]=$( this ).find('td:nth-child(2)').find('div').not('[class]').first().text().split('|');
                        result.push({
                            source:'VodLocker',
                            url:$( this ).find('a').first().attr('href'),
                            title:$( this ).find('div.link').first().text(),
                            poster:$( this ).find('a').first().css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,''),
                            duration:$( this ).find('span').first().text(),
                            file:false,
                            screen_map:$( this ).find('a').first().css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'').replace(/_t/,'0000'),
                            views:views.replace(/\D/g, ''),
                            uploaded:days.replace(/\D/g, ''),
                        });
                    });;
                    console.log(result);
                    $('.search_online').attr('tpl-get', JSON.stringify(result)).attr('tpl-name', 'videos');
                    var script = document.createElement('script');
                    script.textContent = '(' +  function () { 
                        var scope=angular.element($('[ng-controller=OnlineCtrl]')).scope();
                        scope.$apply(function() 
                        {
                            scope.templateURL='video_search_result';
                            scope.videos = JSON.parse(angular.element('[tpl-name=videos]').attr('tpl-get'));
                        });
                        } + ')();';
                    (document.head||document.documentElement).appendChild(script);
                }
        );
    });
    //*/
});
/*
document.addEventListener('DOMSubtreeModified', function() {
    var res=document.querySelectorAll("#online-search-result");
    if(res)
    {
        [].forEach.call(res, function(r) {
            r.addEventListener("click", search_result_process);
        });
    }
});
//*/
function search_result_process() {
    var link_to_parse=$(this).attr('data-url');
    if(pattern.test(link_to_parse))
    {
        chrome.runtime.sendMessage
        (
            {
                method: 'GET',
                action: 'xhttp',
                url: link_to_parse
            }, 
                function(responseText) 
                {
                    var video=responseText.match(/<source src="(.*?)" type="video\/mp4">/);
                    var img=responseText.match(/poster="(.*?)">/);
                    $('#video_player').attr('data-url', video[1]).attr('data-img', img[1]);
                }
        );
        
    }
    return false;
}