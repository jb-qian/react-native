import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

import { LargeList } from 'react-native-largelist-v3';
import RefreshHeader from './components/RefreshHeader';

interface Item {
	items: number[];
}

export default class Index extends Component{

	private sectionCount = 10;
	private rowCount = 10;
	private refList: LargeList | null = null;

	private renderSection = (section: number) => {
		return (
			<View style={ styles.section }>
				<Text>
					Section {section}
				</Text>
			</View>
		);
	}

	private renderIndexPath = ( path: any ) => {
		let { section, row } = path;
		return (
			<View style={ styles.row }>
				<Text>
					Section {section} Row {row}
				</Text>
				<View style={styles.line} />
			</View>
		)
	}

	private onRefresh = () => {
		setTimeout(() => {
			this.refList && this.refList.endRefresh();
		}, 2000);
	}

	private onLoading = () => {
		setTimeout(() => {
			this.refList && this.refList.endLoading();
		}, 2000);
	}
	  
	public render (){
		const data = [];
		for (let section = 0; section < this.sectionCount; ++section) {
			const sContent: Item = { items: [] };
			for (let row = 0; row < this.rowCount; ++row) {
				sContent.items.push(row);
			}
			data.push(sContent);
		}
		return (
			<View style={ styles.flex }>
				<LargeList
					ref={ref => this.refList = ref}
					style={ styles.container }
					refreshHeader={ RefreshHeader }
					onRefresh={ this.onRefresh }
					data={ data }
					heightForSection={ () => 50 }
					renderSection={ this.renderSection }
					heightForIndexPath={ () => 50 }
					renderIndexPath={ this.renderIndexPath }
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	flex: {
		flex: 1,
		backgroundColor: '#ccc',
	},
	container: {
		flex: 1,
	},
	section: {
		flex: 1,
		backgroundColor: "gray",
		justifyContent: "center",
		alignItems: "center"
	},
	row: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	line: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		height: 1,
		backgroundColor: "#EEE"
	}
})