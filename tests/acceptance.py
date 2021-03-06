from splinter import Browser
import sys


with Browser('phantomjs') as browser:
    # Visit URL
    url = sys.argv[1]
    browser.visit(url)

    print("Starting test on " + url)

    if browser.is_text_present('todo', wait_time=10):
        print("Success")
        sys.exit(0)
    else:
        print("Failed")
        sys.exit(1)
