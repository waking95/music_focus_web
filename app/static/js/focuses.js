// 处理热点列表相关

function render_focuses(music_type) {
    $.getJSON("/api/v1/focuses", {"music_type": music_type}, function (data) {
        $.get("/static/templates/top_focus_item.html", function (top_focus_template) {
            $.get("/static/templates/focus_item.html", function (focus_template) {
                let focus_html_list = [];
                jQuery.each(data['result'][music_type], function (i, focus_data) {
                    let focus_html;
                    if (i + 1 <= 3) {
                        focus_html = template2html(top_focus_template, focus_data, i);
                    } else {
                        focus_html = template2html(focus_template, focus_data, i);
                    }
                    if (focus_data['recent_read'] !== 0) {
                        focus_html_list.push(focus_html);
                    }
                });
                $("#focus_list")[0].innerHTML = focus_html_list.join('\n');
            });
        });
    });
}

function template2html(template, data, i) {
    return template
        .replace('{link}', data['link'])
        .replace('{index}', (i + 1).toString())
        .replace('{title}', data['title'])
        .replace('{hot}', data['recent_read'].toString())
        .replace('{users}', data['related_users'].join(', '));
}
