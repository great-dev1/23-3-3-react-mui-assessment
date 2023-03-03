const mockData = [
  {
    "id": "header_1",
    "item-type": "header",
    "content": "Application Form",
    "size": "medium",
    "subheader": "Make it easier",
    "textAlign": "center"
  },
  {
    "id": "form_1",
    "item-type": "form",
    "children": [
      {
        "id": "title",
        "item-type": "input",
        "label": "Title",
        "fluid": true,
        "other-required": false
      },
      {
        "id": "formgroup_1",
        "item-type": "formgroup",
        "widths": "equal",
        "children": [
          {
            "id": "firstname",
            "item-type": "input",
            "label": "First name",
            "fluid": true
          },
          {
            "id": "lastname",
            "item-type": "input",
            "label": "Last name",
            "fluid": true
          }
        ]
      },
      {
        "id": "type",
        "item-type": "dropdown",
        "label": "Type",
        "fluid": true,
        "selection": true,
        "data-elements": [{ key: 0, value: 0, text: 'Value 0' }, { key: 1, value: 1, text: 'Value 1' }, { key: 2, value: 2, text: 'Value 2' }, { key: 3, value: 3, text: 'Value 3' }],
        "placeholder": ""
      },
      {
        "id": "comment",
        "item-type": "textarea",
        "label": "Comment",
        "fluid": true,
        "rows": 5
      }
    ]
  },
  {
    "id": "gridview_1",
    "item-type": "gridview",
    "columns": [
      {
        "id": "id",
        "name": "ID",
        "sortable": true,
        "filterable": false,
        "resizable": false
      },
      {
        "id": "title",
        "name": "Title",
        "sortable": true,
        "filterable": false,
        "resizable": false
      },
      {
        "id": "completed",
        "name": "Done",
        "sortable": true,
        "filterable": false,
        "resizable": false
      }
    ]
  },
  {
    "id": "btnDisplay",
    "item-type": "button",
    "content": "Display JSON",
    "primary": true,
    "fluid": false,
    "events": {

    }
  }
]

export default mockData
