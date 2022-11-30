export default class XmlParser {

    constructor(XmlString) {
        this.XmlDocument = this.ParsString(XmlString)
    }

    ParsString(XmlString) {
        let result

        let tags = this.TagSeparation(XmlString)
        result = this.CreateXmlDom(tags)

        return result
    }

    CreateXmlDom(tags) {

        let xmlDom = []
        let tag
        let isChildrenTags = false
        let attributes = {}
        let tagName = ''

        for (let i = 0; i < tags.length; i++) {
            tag = tags[i]

            // Если является тегом
            if (tag[0] + tag[1] != '<?' && tag[0] + tag[1] != '</' && tag[tag.length - 2] + tag[tag.length - 1] != '/>' && !isChildrenTags && tag[0] == '<') {
                isChildrenTags = true

                let arrTag = tag.substring(1, tag.length - 1).split(' ')
                tagName = arrTag[0]


                for (let j = 1; j < arrTag.length; j++) {
                    arrTag[j] = arrTag[j].split('=')
                    if (arrTag[j][1]) {
                        arrTag[j][1] = arrTag[j][1].substring(1, arrTag[j][1].length - 1).split(' ')
                        attributes[arrTag[j][0]] = String(arrTag[j][1])
                    }
                }
                let ChildrenTags = this.CreateXmlDom(tags.slice(i + 1, tags.indexOf('</' + arrTag[0] + '>', i + 1)))

                xmlDom.push({
                    name: arrTag[0],
                    attributes,
                    nestedTags: ChildrenTags,
                })

                attributes = {}
            }
            // Если является вложенным текстом
            else if(typeof tag == "string" && tags[i][0]!='<' && !isChildrenTags){
                xmlDom.push(tag)
            }

            if (tag == '</' + tagName + '>') {
                isChildrenTags = false
                tagName = ''
                attributes = {}
            }

            if ((tag[tag.length - 2] + tag[tag.length - 1] == '?>' || tag[tag.length - 2] + tag[tag.length - 1] == '/>') && !isChildrenTags) {
                attributes = {}
                let arrTag = tag[tag.length - 2] + tag[tag.length - 1] == '?>' ? tag.substring(2, tag.length - 2).split(' ') : tag.substring(1, tag.length - 2).split(' ')

                for (let j = 1; j < arrTag.length; j++) {
                    arrTag[j] = arrTag[j].split('=')
                    if (arrTag[j][1]) {
                        arrTag[j][1] = arrTag[j][1].substring(1, arrTag[j][1].length - 1).split(' ')
                        attributes[arrTag[j][0]] = String(arrTag[j][1])
                    }
                }

                xmlDom.push({
                    name: arrTag[0],
                    attributes,
                    nestedTags: null,
                })
            }
        }

        return xmlDom
    }

    getXmlDocument() {
        return this.XmlDocument
    }

    getSelectByTagName(tagName, xmlDocument = this.XmlDocument) {
        for (let i = 0; i < xmlDocument.length; i++) {
            if (xmlDocument[i].name == tagName) return xmlDocument[i]
            else if (xmlDocument[i].nestedTags) {

                let result = this.getSelectByTagName(tagName, xmlDocument[i].nestedTags)
                if (result) return result
            }
        }

        return null
    }

    getSelectById(tagId, xmlDocument = this.XmlDocument) {

        for (let i = 0; i < xmlDocument.length; i++) {

            try {

                if (xmlDocument[i].attributes.id == tagId) {

                    return xmlDocument[i]
                } else if (xmlDocument[i].nestedTags) {
                    let result = this.getSelectById(tagId, xmlDocument[i].nestedTags)
                    if (result) return result

                }
            } catch (error) {

                if (error.message == "Cannot read properties of undefined (reading 'id')" && xmlDocument[i].nestedTags) {
                    let result = this.getSelectById(tagId, xmlDocument[i].nestedTags)
                    if (result) return result
                }
            }

        }

        return null
    }

    getSelectByCustom(property, value, xmlDocument = this.XmlDocument) {

        for (let i = 0; i < xmlDocument.length; i++) {

            try {

                if (xmlDocument[i].attributes[property] == value) {

                    return xmlDocument[i]
                } else if (xmlDocument[i].nestedTags) {
                    let result = this.getSelectByCustom(property, value, xmlDocument[i].nestedTags)
                    if (result) return result

                }
            } catch (error) {

                if (xmlDocument[i].nestedTags) {
                    let result = this.getSelectByCustom(property, value, xmlDocument[i].nestedTags)
                    if (result) return result
                }
            }

        }

        return null
    }


    getSelectByAllTagName(tagName, xmlDocument = this.XmlDocument) {
        let result = []
        for (let i = 0; i < xmlDocument.length; i++) {
            if (xmlDocument[i].name == tagName) result.push(xmlDocument[i])

            if (xmlDocument[i].nestedTags) {

                let tag = this.getSelectByAllTagName(tagName, xmlDocument[i].nestedTags)
                if (tag) result.push(tag)
            }
        }

        return result
    }

    TagSeparation(XmlString) {
        let isStartTag = false
        let isStartText = false
        let tag = ''
        let text = ''
        let tags = []

        for (let i = 0; i < XmlString.length; i++) {

            if (XmlString[i] == '<' || (XmlString[i] + XmlString[i + 1]) == '</') {
                isStartText = false
                isStartTag = true
                if (text.split(" ").join("")) tags.push(text)
                text = ''
            }

            if (isStartText) {
                text += XmlString[i]
            }

            if (isStartTag) {
                tag += XmlString[i]
            }

            if ((XmlString[i - 1] + XmlString[i]) == '/>' || XmlString[i] == '>') {
                isStartTag = false
                isStartText = true
                tags.push(tag)
                tag = ''
            }
        }
        return tags
    }

}