import json
import sys
import datetime

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "supports":
            sys.exit(0)

    context, book = json.load(sys.stdin)
    timestamp = datetime.datetime.now().timestamp()

    for section in book['sections'][1:]:

        if 'Chapter' in section:

            breadcrumbs = section['Chapter']['name']
            for parent_name in section['Chapter']['parent_names']:
                breadcrumbs += ' &bull; ' + parent_name

            section['Chapter']['content'] = '<div class="breadcrumbs">' + breadcrumbs + '</div>\n\n' \
                + section['Chapter']['content'] + \
                    '<div class="version">Generated at <strong>{}</strong></div>'.format(timestamp)

    print(json.dumps(book))