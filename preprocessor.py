import json
import sys
import datetime

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "supports":
            sys.exit(0)

    context, book = json.load(sys.stdin)
    time = datetime.datetime.now().strftime("%Y.%m")

    # appends the breadcrumbs version to the content header
    def breadcrumbs(section):
        breadcrumbs = []
        for parent_name in section['Chapter']['parent_names']:
            breadcrumbs.append(parent_name)
        breadcrumbs.append(section['Chapter']['name'])
        return '<div class="breadcrumbs">' + ' &raquo; '.join(breadcrumbs) + '</div>\n\n' + section['Chapter']['content']

    # appends the timestamp version to the content footer
    def version(section, timestamp):
        return section['Chapter']['content'] + '\n\n<div class="version">Generated at: <strong>{}</strong></div>'.format(time)

    # apply patch function to given `section`
    def process(section, time):
        if 'Chapter' in section:
            section['Chapter']['content'] = breadcrumbs(section)
            section['Chapter']['content'] = version(section, time)
            for sub_item in section['Chapter'].get('sub_items', []):
                process(sub_item, time)

    # apply `version` for the first section
    book['sections'][0]['Chapter']['content'] = version(book['sections'][0], time)

    # apply `breadcrumbs` + `version` for the next sections
    for section in book['sections'][1:]:
        process(section, time)

    print(json.dumps(book))