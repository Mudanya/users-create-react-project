import React from "react";
import { Formik } from "formik";
import { Input, Button, Tag } from "antd";
import { addNewStudent } from "../client";

const addBottomMargin = { marginBottom: "5px" };
const tagStyle = { backgroundColor: "#f50", color: "#fff", ...addBottomMargin };
const AddStudentForm = props => (
	<Formik
		initialValues={{ first_name: "", last_name: "", email: "", gender: "" }}
		validate={values => {
			let errors = {};
			if (!values.first_name) {
				errors.first_name = "first name is required!";
			}
			if (!values.last_name) {
				errors.last_name = "last name is required!";
			}
			if (!values.email) {
				errors.email = "email is required";
			} else if (
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
			) {
				errors.email = "Invalid email";
			}
			if (!values.gender) {
				errors.gender = "gender is required!";
			} else if (
				!["MALE", "male", "FEMALE", "female"].includes(values.gender)
			) {
				errors.gender = "Gender must be (male,female)";
			}

			return errors;
		}}
		onSubmit={(student, { setSubmitting }) => {
			addNewStudent(student)
				.then(() => {
					props.onSuccess();
				})
				.catch(err => {
					props.onFailure(err);
				})
				.finally(() => {
					setSubmitting(false);
				});
		}}
	>
		{props => (
			<form onSubmit={props.handleSubmit}>
				<Input
					style={addBottomMargin}
					name="first_name"
					onChange={props.handleChange}
					onBlur={props.handleBlur}
					value={props.values.first_name}
					placeholder="First_nName e.g Nexo"
				/>
				{props.errors.first_name && props.touched.first_name && (
					<Tag style={tagStyle} id="feedback">
						{props.errors.first_name}
					</Tag>
				)}
				<Input
					style={addBottomMargin}
					name="last_name"
					onChange={props.handleChange}
					onBlur={props.handleBlur}
					value={props.values.last_name}
					placeholder="last Name e.g bentola"
				/>
				{props.errors.last_name && props.touched.last_name && (
					<Tag style={tagStyle} id="feedback">
						{props.errors.last_name}
					</Tag>
				)}
				<Input
					style={addBottomMargin}
					name="email"
					onChange={props.handleChange}
					onBlur={props.handleBlur}
					value={props.values.email}
					placeholder="email e.g Nexo@soarex.com"
				/>
				{props.errors.email && props.touched.email && (
					<Tag style={tagStyle} id="feedback">
						{props.errors.email}
					</Tag>
				)}
				<Input
					style={addBottomMargin}
					name="gender"
					onChange={props.handleChange}
					onBlur={props.handleBlur}
					value={props.values.gender}
					placeholder="gender e.g male or female"
				/>
				{props.errors.gender && props.touched.gender && (
					<Tag style={tagStyle} id="feedback">
						{props.errors.gender}
					</Tag>
				)}
				<Button
					onClick={() => props.submitForm()}
					disabled={props.isSubmitting | (props.touched && !props.isValid)}
					type="submit"
				>
					Submit
				</Button>
			</form>
		)}
	</Formik>
);

export default AddStudentForm;
