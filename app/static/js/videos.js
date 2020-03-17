// 处理视频列表相关

function render_videos(music_type) {
    $.getJSON("/api/v1/videos", {"music_type": music_type}, function (data) {
        $.get("/static/templates/video_item.html", function (video_template) {
            let video_html_list = [];
            $.each(data['result'][music_type], function (i, video_data) {
                let item_html = video_template
                    .replace('{url}', video_data['url'])
                    .replace('{cover_path}', video_data['cover_path'])
                    .replace('{user_name}', video_data['user_name'])
                    .replace('{display_view_cnt}', video_data['display_view_cnt']);
                video_html_list.push(item_html);
            });
            $("#video_list")[0].innerHTML = video_html_list.join('\n');
        });
    });
}