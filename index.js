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
        } + ')();';
    (document.head||document.documentElement).appendChild(script); //inject in controller what we have plugin on user side
});

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