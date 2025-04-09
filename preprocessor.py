import json
import sys
import datetime

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "supports":
            sys.exit(0)

    context, book = json.load(sys.stdin)
    time = datetime.datetime.now()

    def patch(section, timestamp):
        breadcrumbs = section['Chapter']['name']
        for parent_name in section['Chapter']['parent_names']:
            breadcrumbs += ' &bull; ' + parent_name
        return (
            '<div class="breadcrumbs">' + breadcrumbs + '</div>\n\n' + section['Chapter']['content'] +
            '<div class="version">Revision: <strong>{} / {}</strong></div>'.format(time.strftime("%Y.%m"), time.timestamp())
        )

    for section in book['sections'][1:]:
        if 'Chapter' in section:
            for sub_item in reversed(section['Chapter']['sub_items']):
                if 'Chapter' in sub_item: # @TODO wants recursive patch to support child sub_items
                    sub_item['Chapter']['content'] = patch(sub_item, time)
            section['Chapter']['content'] = patch(section, time)

    print(json.dumps(book))