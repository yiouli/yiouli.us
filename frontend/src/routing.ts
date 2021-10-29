// routing path here should match the page_html_url returned in api data (/api/v2/pages/) for each page
// the page_html_url path is determined by the page tree structure (managed in wagtail admin portal)
// the url by default is transformed from page title, using lower case and hypens.
// current implementation assume the site is rooted on an individual page (configured via admin portal -> settings -> sites)
