import * as React from 'react'
import { Table, Input, Popconfirm, Typography } from 'antd'
import Highlighter from 'react-highlight-words'

import PasswordField from './password-field'

function PassTable({ loading, data, onDeletePass }) {
  const [searchText, setSearchText] = React.useState('')
  const [dataTable, setDataTable] = React.useState([])

  React.useEffect(() => {
    setDataTable(
      searchText.length
        ? data.filter((pass) =>
            pass.URL.toString()
              .toLocaleLowerCase()
              .includes(searchText.toLocaleLowerCase())
          )
        : data
    )
  }, [searchText])

  React.useEffect(() => {
    if (Array.isArray(data)) {
      setDataTable(data)
    }
  }, [data])

  const columns = React.useMemo(
    () => [
      {
        title: 'Url',
        dataIndex: 'URL',
        ellipsis: true,
        sorter: (a, b) => a.URL.localeCompare(b.URL),
        sortDirections: ['descend', 'ascend'],
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        )
      },
      {
        title: 'Username',
        dataIndex: 'Username',
        render: (text) => (
          <Typography.Paragraph style={{ marginBottom: 0 }} copyable>
            {text}
          </Typography.Paragraph>
        )
      },
      {
        title: 'Password',
        dataIndex: 'Password',
        render: (text) => <PasswordField>{text}</PasswordField>
      },
      {
        key: 'action',
        width: 80,
        render: (text, record) => (
          <Popconfirm
            title="Are you sure delete this pass?"
            onConfirm={() => onDeletePass(record.ID)}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
        )
      }
    ],
    []
  )

  const handleInputChange = React.useCallback((event) => {
    setSearchText(event.target.value)
  }, [])

  return (
    <div>
      <Input
        allowClear
        style={{ marginBottom: 20 }}
        placeholder="Search"
        value={searchText}
        onChange={handleInputChange}
      />

      <Table
        size="small"
        loading={loading}
        columns={columns}
        rowKey="ID"
        dataSource={dataTable}
      />
    </div>
  )
}

export default PassTable
