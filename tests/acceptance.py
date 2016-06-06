from splinter import Browser
import sys


with Browser('phantomjs') as browser:
    # Visit URL
    url = sys.argv[1]
    browser.visit(url)



    if browser.is_text_present('todo', wait_time=10):
        sys.exit(0)
    else:
        sys.exit(1)
