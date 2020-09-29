function transform(uri) {
  return `wget -nd -P . -A jpeg,jpg,bmp,gif,png ${uri}`
}

function getUri() {
  let doc = document.getElementsByClassName('jsontree_value jsontree_value_string')
  const images = []
  for(let i=0; i<doc.length; i++) {
    let item = doc[i];
    if(item.innerText.includes('.jpg')) {
      images.push(transform(item.innerText.replace(/"/g, '')))
    }
  }
  images.forEach(item => console.log(item))
  return images
}