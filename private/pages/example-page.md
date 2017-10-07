# Developer notes

### New


### Priorities
- use D3 to convert the tables to graphs
- Docs: write documentation
- Styleguide: create better style guide for to group css
- TDD: write tests
- Responsive database: i.e. embedded data gets updated with source data gets updated
- Validation: more detailed validation when doing the initial checks on the server and the client side + custom methods for jquery validation for pull down options
- Filters: Search filter - select / unselect all

### For client
- Extend search to other fields? if so which?

### Outstanding questions
- is there a safe way to parse the markdown data vs using the code in components > Page?
- is there a way of indexing in mongo (without ORM)?
- is there a way of conducting a weighted search in mongo (without ORM)?
- best ways of backup?

### To do


### Done
- Public: Search results to be sorted by updatedAt
- Public: Change search result page to search for all if no params are available
- Public: Extend search for reports to tags
- Public: Extend search for articles to tags
- Admin : opening a charity for edit causes the donation link to revert to website link
- Public : revenue model for program is not program but charity
- Income and expenditure to show, if data exists
- Change philantrophy insights to sector reports
- Change sector reports panel to non collapsable
- Take out About us, impact evaluation and home page from the nav bar
- Change home to point to existing website from <Link to="/"><img src='/jc_logo.png' alt='home-page'/></Link>

- Change Navigation component, home page link from '/' to 'https://justcauseasia.org'
- Report - go to website or click to donate to open in new tab
``<a href="http://example.com/files/myfile.pdf" target="_blank">Download</a>``
- Article page - have a button to download the image
``<a href="link/to/your/download/file" download>Download link</a>``
- About page - update email to info@justcauseasia.org
- Report - Impact - Alignment is off change to tables
- Mobile responsive
- About page - change raise logo to AVPN
- About page - Add extra people ( no Nelly, no volunteers, shelly )
- Change headers to talk about new site, old site, links
- Remove signup and login ( or change color )
- Convert the sign up to a create user. Remove the login from the nav bar.
- template aside to remove effects from mouse over
- add UX/UI elements - highlight current page in nav bar, change colour for panels that open (e.g. advance search / panels), search button color on hover, animate
- link related articles / reports
- Make header sticky
- Make cards pop

### Notes
Read more on the [boilerplate](http://cleverbeagle.com/pup/v1/the-basics/methods#utility-methods).
