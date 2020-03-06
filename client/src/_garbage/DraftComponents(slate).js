import React from "react"
import { cx, css } from "emotion"

export const Button = React.forwardRef(
    ({ className, active, reversed, ...props }, ref) => (
        <span
          {...props}
          ref={ref}
          className={cx(
            className,
            css`
              cursor: pointer;
              color: ${reversed
                ? active
                  ? 'white'
                  : '#aaa'
                : active
                ? 'black'
                : '#ccc'};
            `
          )}
        />
    )
)

export const Icon = React.forwardRef(({ className, ...props }, ref) => (
    <span
        {...props}
        ref={ref}
        className={cx(
        'material-icons',
        className,
        css`
            font-size: 18px;
            vertical-align: text-bottom;
        `
        )}
    />
))

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
    <div
        {...props}
        ref={ref}
        className={cx(
        className,
        css`
            & > * {
            display: inline-block;
            }
            & > * + * {
            margin-left: 15px;
            }
        `
        )}
    />
))

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
    <Menu
        {...props}
        ref={ref}
        className={cx(
        className,
        css`
            position: absolute;
            width:100%;
            padding-top:10px;
            padding-bottom: 10px;
            border-right: 1px solid #eaeaea;
            border-bottom: 1px solid #eaeaea;
            margin-bottom: 20px;
            margin-left: -1px;
            margin-top: 30px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        `
        )}
    />
))

