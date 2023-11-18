const flattenTags = (tags) => {
  return (
    tags = tags.map(tag => {
      return tag.tags_id.tag_name.toLowerCase()
    })
  )
}

module.exports = flattenTags
exports.default = flattenTags