import json
import sys
import datetime

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "supports":
            sys.exit(0)

    context, book = json.load(sys.stdin)
    time = datetime.datetime.now()

    def breadcrumbs(section):
        breadcrumbs = []
        for parent_name in section['Chapter']['parent_names']:
            breadcrumbs.append(parent_name)
        breadcrumbs.append(section['Chapter']['name'])
        return '<div class="breadcrumbs">' + ' &raquo; '.join(breadcrumbs) + '</div>\n\n' + section['Chapter']['content']

    def version(section, timestamp):
        return section['Chapter']['content'] + '\n\n<div class="version">Generated at: <strong>{} / {}</strong></div>'.format(time.strftime("%Y.%m"), time.timestamp())

    # apply `version` for the first section
    book['sections'][0]['Chapter']['content'] = version(book['sections'][0], time)

    # apply `breadcrumbs` + `version` for the next sections
    for section in book['sections'][1:]:
        if 'Chapter' in section:
            for sub_item in section['Chapter']['sub_items']:
                if 'Chapter' in sub_item: # @TODO wants recursive patch?
                    sub_item['Chapter']['content'] = breadcrumbs(sub_item)
                    sub_item['Chapter']['content'] = version(sub_item, time)
            section['Chapter']['content'] = breadcrumbs(section)
            section['Chapter']['content'] = version(section, time)

    print(json.dumps(book))