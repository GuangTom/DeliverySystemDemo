const db = wx.cloud.database();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		applyList:[]
	},
	examine(e){
		wx.showLoading({
			title: '加载中...',
		})
		const {item:{_id},name} = e.currentTarget.dataset;
		db.collection('applyOrder').doc(_id).update({
			data:{
				state:name,
				examinePerson:wx.getStorageSync('openID')//记录审核员id
			},
			success:(res)=>{
				this.onShow();
			}
		})
		wx.hideLoading();
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		db.collection('applyOrder').where({
			state:'待审核'
		}).get({
			success:(res)=>{
				this.setData({
					applyList:res.data
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})