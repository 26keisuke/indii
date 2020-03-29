// import React from "react"
// import { mount } from "enzyme"
// import { Confirm } from "../Confirm"

// function init(next) {
//     return {
//         update: {
//             confirmation: {
//                 on: true,
//                 id: "TEST_ID",
//                 action: "TEST_ACTION",
//                 title: "TEST_TITLE",
//                 message: "TEST_MESSAGE",
//                 buttonMessage: "TEST_BTN",
//                 next: next,
//                 value: "TEST_VALUE"
//             }
//         }
//     }
// }

// var action;

// const postAction = (shouldProceed) => {
//     action = shouldProceed
// }

// const props = init()
// const wrapper = mount(<Confirm {...props} postAction={postAction}/>)

// const withNext = (nextName) => {
//     const props = init(nextName)

//     return {
//         wrapperWithNext: mount(<Confirm {...props} postAction={postAction}/>),
//         props: props
//     }
// }

// describe("Confirm", () => {
//     it("rendered w/o error", () => {
//         expect(wrapper).toMatchSnapshot()
//     })

//     describe("correct text", () => {
//         it("<Title>", () => {
//             const title = wrapper.find("h2")
//             expect(title.text()).toBe("TEST_TITLE")
//         })
    
//         it("<Message>", () => {
//             const message = wrapper.find("h4")
//             expect(message.text()).toBe("TEST_MESSAGE")
//         })
    
//         it("<Button>", () => {
//             const firstBtn = wrapper.find("button").at(0)
//             expect(firstBtn.text()).toBe("TEST_BTN")
//         })
//     })

//     describe("click events working correctly", () => {

//         beforeEach(() => {
//             action = undefined;
//         })

//         it("<Done>", () => {
//             const firstBtn = wrapper.find("button").at(0)
//             firstBtn.simulate("click")
//             expect(action).toBe(true)
//         })

//         it("<Next>", () => {
//             const { wrapperWithNext } = withNext("TEST_NEXT")
//             const firstBtn = wrapperWithNext.find("button").at(0)
//             firstBtn.simulate("click")
//             expect(action).toBe(undefined)
//         })

//         it("<Cancel(button)>", () => {
//             const secondBtn = wrapper.find("button").at(1)
//             secondBtn.simulate("click")
//             expect(action).toBe(false)
//         })

//         it("<Cancel(icon)>", () => {
//             const crossIcon = wrapper.find("svg")
//             crossIcon.simulate("click")
//             expect(action).toBe(false)
//         })
//     })
// })
