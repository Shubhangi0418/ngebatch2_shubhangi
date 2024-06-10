import open from 'open'

open('./index.html').finally(() => console.log('Opened HTML file'))
