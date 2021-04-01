import React, { Component } from "react";
import "./App.css";
import { getAllstudents } from "./client";
import { Table, Avatar, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Container from "./Container";
import Footer from "./Footer";
import AddStudentForm from "./forms/AddStudentForm";
import { errorNotification } from "./Notifications";
import { Empty } from "antd";

const getIndicatorIcon = () => {
	<LoadingOutlined type="Loading" style={{ fontSize: 24 }} spin />;
};
class App extends Component {
	state = { students: [], isFetching: false, isAddStudentModalVisible: true };

	componentDidMount() {
		this.fetchStudents();
	}

	fetchStudents = () => {
		this.setState({ isFetching: true });
		getAllstudents()
			.then(res =>
				res.json().then(students => {
					this.setState({ students, isFetching: false });
				})
			)
			.catch(error => {
				const message = error.error.message;
				const description = error.error.httpStatus;
				errorNotification(message, description);
				this.setState({ isFetching: false });
			});
	};

	openAddStudentModal = () => this.setState({ isAddStudentModalVisible: true });
	closeAddStudentModal = () =>
		this.setState({ isAddStudentModalVisible: false });
	render() {
		const { students, isFetching, isAddStudentModalVisible } = this.state;
		const commonElements = () => (
			<div>
				<Modal
					title="Add new student"
					visible={isAddStudentModalVisible}
					onOk={this.closeAddStudentModal}
					onCancel={this.closeAddStudentModal}
					width={1000}
				>
					<AddStudentForm
						onSuccess={() => {
							this.closeAddStudentModal();
							this.fetchStudents();
						}}
						onFailure={error => {
							const message = error.error.message;
							const description = error.error.httpStatus;
							errorNotification(message, description);
						}}
					/>
				</Modal>
				<Footer
					numberOfStudents={students.length}
					handleAddStudent={this.openAddStudentModal}
				/>
			</div>
		);
		if (isFetching) {
			return (
				<Container>
					<Spin indicator={getIndicatorIcon()} />
				</Container>
			);
		}
		if (students && students.length) {
			const columns = [
				{
					title: "",
					key: "avatar",
					render: (text, student) => (
						<Avatar size="large">{`${student.first_name
							.charAt(0)
							.toUpperCase()}${student.last_name
							.charAt(0)
							.toUpperCase()}`}</Avatar>
					),
				},
				{ title: "Student Id", dataIndex: "studentId", key: "studentId" },
				{ title: "First Name", dataIndex: "first_name", key: "first_name" },
				{ title: "Last name", dataIndex: "last_name", key: "last_name" },
				{ title: "Email", dataIndex: "email", key: "email" },
				{ title: "Gender", dataIndex: "gender", key: "gender" },
			];
			return (
				<Container>
					<Table
						style={{ marginBottom: "100px" }}
						dataSource={students}
						columns={columns}
						rowKey="studentId"
						pagination={false}
					/>
					{commonElements()}
				</Container>
			);
		}
		return (
			<Container>
				<Empty description={<h1>No students found!</h1>} />
				{commonElements()}
			</Container>
		);
	}
}

export default App;
