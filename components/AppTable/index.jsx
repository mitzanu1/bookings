import React from "react"
import _ from "lodash"
import join from "classnames"
import styles from "./index.module.scss"
import { useTranslation } from "react-i18next"
import { Card, Table } from "@mantine/core"


function AppTable({
  columns,
  rows = [],
  loading,
  extraRows,
  renderExpanded = _.noop,
  className,
  style,
  ...props
}) {
  const { t } = useTranslation()
  return (
    <Card className={join(styles.appTable, className)} style={style}>
      <Table withBorder {...props}>
        <thead>
          <tr className={styles.header}>
            {columns.map((column) => {
              const {
                id,
                label,
                className,
                style,
                size,
                render,
                align,
                colSpan,
                ...rest
              } = column
              const _className = join(className, styles[size], styles[align])
              const value = (label || t(id))
              return (
                <th
                  {...rest}
                  key={id}
                  style={style}
                  className={_className}
                >
                  {value}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {loading && rows.length === 0 &&
            <tr key="loading">
              <td colSpan="100%">{t("loading_data")}</td>
            </tr>
          }
          {!loading && rows.length === 0 &&
            <tr key="noData">
              <td colSpan="100%">{t("no_data")}</td>
            </tr>
          }
          {rows.map((row, index) => {
            const { id: rowId } = row
            const expandedRow = renderExpanded(row)
            return (
              <React.Fragment key={rowId}>
                <tr className={styles.row}>
                  {columns.map((column) => {
                    const {
                      id: columnId,
                      label,
                      render,
                      className,
                      style,
                      size,
                      align,
                      ...rest
                    } = column

                    const _className = join(className, styles[size], styles[align])
                    const value = render
                      ? render(row, { index })
                      : _.get(row, columnId)

                    return (
                      <td
                        {...rest}
                        key={columnId}
                        className={_className}
                        style={style}
                      >
                        {value}
                      </td>
                    )
                  })}
                </tr>
                {expandedRow &&
                  <tr className={styles.expandedRow}>
                    <td colSpan="100%">
                      {expandedRow}
                    </td>
                  </tr>
                }
              </React.Fragment>
            )
          })}
          {extraRows}
        </tbody>
      </Table>
    </Card>
  )
}


export default React.memo(AppTable)