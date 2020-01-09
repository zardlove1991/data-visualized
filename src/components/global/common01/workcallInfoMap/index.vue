<template>
  <div class="common01-workmap">
    <div class="reporter-map-wrap sys-flex sys-flex-center flex-justify-center">
      <call
        :info-item.sync="callInfo"
        :call-show.sync="callShow"
        :call-type.sync="callType"
      ></call>
      <div id="my-map" ref="allmap" class="reporter-map"></div>
      <div class="reporter-list-wrap">
        <div class="reporter-title common01-ft70">{{viewAttr.header || '记者列表'}}</div>
        <div class="reporter-body" v-if="reporterList && reporterList.length">
          <div class="reporter-list" v-for="(v, k) in reporterList" :key="k">
            <div class="sys-flex list-body sys-flex-center">
              <div class="avatar-box">
                <img class="avatar" v-if="v.avatar" :src="v.avatar && v.avatar.uri" />
                <img class="avatar" v-if="!v.avatar" src="./assets/default_avatar.png" />
              </div>
              <div class="member-name">
                <div class="name common01-ft58 overhidden">{{v.member_name}}</div>
                <div class="role common01-ft38 overhidden">{{v.org_title}}-{{v.role_title}}</div>
              </div>
              <div class="connect connect-audio" @click="callaudio(v)"></div>
              <div class="connect connect-video" @click="callvideo(v)"></div>
            </div>
            <div class="border-line"></div>
          </div>
        </div>
        <div class="no-data" v-else>暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import call from './call.vue'
import loadScript from '@/utils/loadScript.js'
import loadBMap from '@/utils/loadBMap.js'
import { getWorkCallConnectList } from '@/servers/interface'
import { getDataConfig } from '@/utils/model'
export default {
  name: 'workcallInfoMap',
  data () {
    return {
      center: '',
      reporterList: [],
      frequency: 120000,
      callInfo: {},
      callShow: false,
      callType: 'video',
      coordinateList: [],
      unlinecoordinateList: [],
      mapStyle: {
        styleJson: [
          {
            featureType: 'land',
            elementType: 'geometry',
            stylers: {
              color: '#16254aff',
              visibility: 'on'
            }
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#0d5ec9ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'building',
            elementType: 'geometry.fill',
            stylers: {
              color: '#0b193bff',
              visibility: 'on'
            }
          },
          {
            featureType: 'building',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#000722ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: {
              color: '#092f70ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'village',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'town',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'district',
            elementType: 'labels',
            stylers: {
              visibility: 'on'
            }
          },
          {
            featureType: 'country',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#65a5ecff',
              visibility: 'on'
            }
          },
          {
            featureType: 'city',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#65a5ecff',
              visibility: 'on'
            }
          },
          {
            featureType: 'continent',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#65a5ecff',
              visibility: 'on'
            }
          },
          {
            featureType: 'poilabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'poilabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'scenicspotslabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'scenicspotslabel',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#092f70ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'transportationlabel',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#092f70ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'transportationlabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'airportlabel',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#092f70ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'airportlabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: {
              color: '#17192eff',
              visibility: 'on'
            }
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#000006ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: {
              weight: 3
            }
          },
          {
            featureType: 'green',
            elementType: 'geometry',
            stylers: {
              color: '#0a2e6dff',
              visibility: 'on'
            }
          },
          {
            featureType: 'scenicspots',
            elementType: 'geometry',
            stylers: {
              color: '#16254aff',
              visibility: 'on'
            }
          },
          {
            featureType: 'scenicspots',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#3c70b6ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'scenicspots',
            elementType: 'labels.text.stroke',
            stylers: {
              weight: 1,
              color: '#092157ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'continent',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff',
              visibility: 'on',
              weight: 1
            }
          },
          {
            featureType: 'country',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff',
              visibility: 'on',
              weight: 1
            }
          },
          {
            featureType: 'city',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff',
              visibility: 'on',
              weight: 1
            }
          },
          {
            featureType: 'city',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'scenicspotslabel',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff',
              visibility: 'on',
              weight: 1
            }
          },
          {
            featureType: 'airportlabel',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff',
              visibility: 'on',
              weight: 1
            }
          },
          {
            featureType: 'transportationlabel',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff',
              visibility: 'on',
              weight: 1
            }
          },
          {
            featureType: 'railway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'subway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'highwaysign',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'nationalwaysign',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'nationalwaysign',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'provincialwaysign',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'provincialwaysign',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'tertiarywaysign',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'tertiarywaysign',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'subwaylabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'subwaylabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#092f70ff',
              visibility: 'on',
              weight: 90
            }
          },
          {
            featureType: 'road',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff',
              visibility: 'on',
              weight: 1
            }
          },
          {
            featureType: 'shopping',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'scenicspots',
            elementType: 'labels',
            stylers: {
              visibility: 'on'
            }
          },
          {
            featureType: 'scenicspotslabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'manmade',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'manmade',
            elementType: 'labels',
            stylers: {
              visibility: 'on'
            }
          },
          {
            featureType: 'highwaysign',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#0a2e6d00',
              visibility: 'on'
            }
          },
          {
            featureType: 'road',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '6'
            }
          },
          {
            featureType: 'road',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '7'
            }
          },
          {
            featureType: 'road',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '8'
            }
          },
          {
            featureType: 'road',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '9'
            }
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '6'
            }
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '7'
            }
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '8'
            }
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '9'
            }
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '6'
            }
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '7'
            }
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '8'
            }
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '9'
            }
          },
          {
            featureType: 'road',
            elementType: 'labels.text',
            stylers: {
              fontsize: 24
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff',
              visibility: 'on',
              weight: 1
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#092963ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#093d8bff'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#092f70ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry',
            stylers: {
              weight: 3
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#17192eff',
              visibility: 'on'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#1c4f7eff'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#566b92ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff',
              visibility: 'on',
              weight: 1
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'geometry',
            stylers: {
              weight: 3
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#17192eff',
              visibility: 'on'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#17192eff',
              visibility: 'on'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry.fill',
            stylers: {
              color: '#17192eff',
              visibility: 'on'
            }
          },
          {
            featureType: 'tertiaryway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#17192eff',
              visibility: 'on'
            }
          },
          {
            featureType: 'fourlevelway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#17192eff',
              visibility: 'on'
            }
          },
          {
            featureType: 'local',
            elementType: 'geometry.fill',
            stylers: {
              color: '#17192eff',
              visibility: 'on'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#000006ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#000006ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#000006ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'tertiaryway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#000006ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'fourlevelway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#000006ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'local',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#000006ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'local',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#3460a3ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'local',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff',
              visibility: 'on',
              weight: 1
            }
          },
          {
            featureType: 'fourlevelway',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#566b92ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'tertiaryway',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#566b92ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#566b92ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#566b92ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#566b92ff',
              visibility: 'on'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff',
              visibility: 'on',
              weight: 1
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff',
              visibility: 'on',
              weight: 1
            }
          },
          {
            featureType: 'arterial',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff',
              visibility: 'on',
              weight: 1
            }
          },
          {
            featureType: 'tertiaryway',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff',
              visibility: 'on',
              weight: 1
            }
          },
          {
            featureType: 'fourlevelway',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff',
              visibility: 'on',
              weight: 1
            }
          },
          {
            featureType: 'fourlevelway',
            elementType: 'geometry',
            stylers: {
              weight: 1
            }
          },
          {
            featureType: 'tertiaryway',
            elementType: 'geometry',
            stylers: {
              weight: 1
            }
          },
          {
            featureType: 'local',
            elementType: 'geometry',
            stylers: {
              weight: 1
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'geometry',
            stylers: {
              weight: 3
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'geometry',
            stylers: {
              weight: 3
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry',
            stylers: {
              weight: 3
            }
          },
          {
            featureType: 'highway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '6'
            }
          },
          {
            featureType: 'highway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '7'
            }
          },
          {
            featureType: 'highway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '8'
            }
          },
          {
            featureType: 'highway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '9'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '6'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '7'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '8'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '9'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '6'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '7'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '8'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '9'
            }
          },
          {
            featureType: 'nationalway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '6'
            }
          },
          {
            featureType: 'nationalway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '7'
            }
          },
          {
            featureType: 'nationalway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '8'
            }
          },
          {
            featureType: 'nationalway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '9'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '6'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '7'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '8'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '9'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '6'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '7'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '8'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '9'
            }
          },
          {
            featureType: 'provincialway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '8,10',
              level: '8'
            }
          },
          {
            featureType: 'provincialway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '8,10',
              level: '9'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '8,10',
              level: '8'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '8,10',
              level: '9'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '8,10',
              level: '8'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '8,10',
              level: '9'
            }
          },
          {
            featureType: 'cityhighway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '6'
            }
          },
          {
            featureType: 'cityhighway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '7'
            }
          },
          {
            featureType: 'cityhighway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '8'
            }
          },
          {
            featureType: 'cityhighway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '9'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '6'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '7'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '8'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '9'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '6'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '7'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '8'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,9',
              level: '9'
            }
          },
          {
            featureType: 'arterial',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '9,9',
              level: '9'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '9,9',
              level: '9'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '9,9',
              level: '9'
            }
          },
          {
            featureType: 'education',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#3c70b6ff'
            }
          },
          {
            featureType: 'medical',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#3c70b6ff'
            }
          },
          {
            featureType: 'transportation',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#3c70b6ff'
            }
          },
          {
            featureType: 'district',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#3a71baff'
            }
          },
          {
            featureType: 'village',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#3a71baff'
            }
          },
          {
            featureType: 'town',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#3a71baff'
            }
          },
          {
            featureType: 'district',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff'
            }
          },
          {
            featureType: 'town',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff'
            }
          },
          {
            featureType: 'village',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#092157ff'
            }
          },
          {
            featureType: 'medical',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'transportation',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'estate',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'transportation',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#1a274bff'
            }
          },
          {
            featureType: 'entertainment',
            elementType: 'geometry',
            stylers: {
              color: '#0a2e6dff',
              visibility: 'off'
            }
          },
          {
            featureType: 'medical',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#1a274bff'
            }
          },
          {
            featureType: 'education',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'education',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#1a274bff'
            }
          },
          {
            featureType: 'subwaystation',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'transportationlabel',
            elementType: 'labels',
            stylers: {
              visibility: 'on'
            }
          },
          {
            featureType: 'transportation',
            elementType: 'labels',
            stylers: {
              visibility: 'on'
            }
          },
          {
            featureType: 'manmade',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#0d5ec9ff'
            }
          },
          {
            featureType: 'manmade',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#0a2e6dff'
            }
          }
        ]
      }
    }
  },
  components: {
    call
  },
  created () {
    getDataConfig().then(res => {
      this.center = { lng: +res.lng, lat: +res.lat }
    })
  },
  mounted () {
    loadScript('/static/jquery.min.js').then(res => {
      loadBMap().then(() => {
        this.getReporter()
        setInterval(() => {
          this.getReporter()
        }, this.frequency)
      })
    })
  },
  methods: {
    rMap () {
      var BMap = window.BMap
      let map = this.map = new BMap.Map('my-map')
      map.addControl(new BMap.NavigationControl())
      map.setMapStyle(this.mapStyle)
      // 绘制带图标注
      var _this = this
      SquareOverlay.prototype = new BMap.Overlay()
      SquareOverlay.prototype.initialize = function (map) {
        this._map = map
        let div = document.createElement('div')
        let img = document.createElement('img')
        let img2 = document.createElement('img')
        let span = document.createElement('span')
        let span2 = document.createElement('span')
        div.appendChild(img)
        div.appendChild(img2)
        div.appendChild(span)
        span.appendChild(span2)
        var item = this._mid
        img.src = this._src
        img.style.position = 'absolute'
        img.style['border-radius'] = '50%'
        img.style.overflow = 'hidden'
        img.style.width = '0.65rem'
        img.style.height = '0.65rem'
        img.style.top = '0'
        img.style.left = '0'
        img.style.zIndex = 10
        img2.style.position = 'absolute'
        img2.style['border-radius'] = '50%'
        img2.style.overflow = 'hidden'
        img2.style.width = '0.3rem'
        img2.style.height = '0.3rem'
        img2.style.bottom = '0'
        img2.style.left = '0.75rem'
        img2.style.background = 'url(' + require('./assets/landmark.png') + ') no-repeat center center'
        img2.style.backgroundSize = '100%'
        span.style.position = 'absolute'
        span.style.borderRadius = '0.215rem'
        span.style.overflow = 'hidden'
        span.style.width = '1.185rem'
        span.style.height = '0.465rem'
        span.style.top = '0.1rem'
        span.style.left = '0.3rem'
        span.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'
        span.style.color = 'rgb(255, 255, 255)'
        span.zIndex = 9
        span2.style.position = 'absolute'
        span2.style.top = '0.075rem'
        span2.style.left = '40%'
        span2.style.fontSize = '0.2rem'
        span2.innerText = item.member_name
        div.style.position = 'absolute'
        div.style.width = '1.5rem'
        div.style.height = '0.925rem'
        map.getPanes().markerPane.appendChild(div)
        this._div = div
        div.onclick = function () {
          _this.callvideo(item)
        }
        return div
      }
      SquareOverlay.prototype.draw = function () {
        var position = this._map.pointToOverlayPixel(this._center)
        this._div.style.left = position.x - this._length / 2 + 5 + 'px'
        this._div.style.top = position.y - this._length / 1.1 + 5 + 'px'
      }
      // 清除覆盖物
      map.clearOverlays()
      this.coordinateList = []
      this.unlinecoordinateList = []
      this.reporterList.forEach(vv => {
        var img = vv.avatar && vv.avatar.uri ? vv.avatar.uri : require('./assets/default_avatar.png')
        if (vv.longitude && vv.latitude) { // 地图上只画在线且有坐标的
          if (vv.rc_status === 0 || vv.rc_status === 1) {
            var mySquare = new SquareOverlay({
              lng: vv.longitude,
              lat: vv.latitude
            }, 60, 'red', img, vv)
            setTimeout(function () {
              if (vv.rc_status === 0) {
                mySquare['_div'].classList.add('landmark-red')
              }
            }, 100)
            map.addOverlay(mySquare)
            // 设置地图的最佳视图
            this.coordinateList.push(new BMap.Point(vv.longitude, vv.latitude))
          } else {
            this.unlinecoordinateList.push(new BMap.Point(vv.longitude, vv.latitude))
          }
        }
      })
      // 绘制带图标注结束
      map.centerAndZoom(new BMap.Point(this.center.lng, this.center.lat), 15)
      map.addControl(new BMap.NavigationControl())
      function SquareOverlay (center, length, color, src, mid) {
        this._src = src
        this._center = center
        this._length = length
        this._color = color
        this._mid = mid
      }
    },
    getReporter () {
      getWorkCallConnectList(this.currentViewId).then(res => {
        if (!res.data.error_code && res.data.result.length) {
          this.reporterList = res.data.result
        }
        this.rMap()
      })
    },
    callaudio (reporter) {
      this.callInfo = reporter
      this.callType = 'audio'
      this.callShow = true
    },
    callvideo (reporter) {
      this.callInfo = reporter
      this.callType = 'video'
      this.callShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/index.scss";
.common01-workmap {
  width: 100%;
  height: 100%;
  padding: pxrem(20px);
  .reporter-map-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    background: url("./assets/mapBorder.png") no-repeat center;
    background-size: 100% 100%;
    color: #fff;
    .reporter-map {
      width: calc(100% - 10px);
      height: calc(100% - 10px);
    }
    .reporter-list-wrap {
      width: pxrem(505px);
      position: absolute;
      top: pxrem(35px);
      right: pxrem(32px);
      .reporter-title {
        width: 100%;
        height: pxrem(80px);
        line-height: pxrem(80px);
        background: #174EC1;
      }
      .reporter-body {
        width: 100%;
        height: pxrem(885px);
        background: #0B2152;
        overflow-y: scroll;
        overflow-x: hidden;
        .reporter-list {
          .avatar-box {
            width: pxrem(80px);
            height: pxrem(80px);
            border-radius: pxrem(5px);
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }
          }
          .member-name {
            width: 38%;
            margin: 0 pxrem(40px) 0 pxrem(21px);
            .name {
              margin-bottom: pxrem(3px);
            }
          }
          .connect {
            width: pxrem(55px);
            height: pxrem(55px);
            background: no-repeat center right;
            background-size: pxrem(55px) pxrem(55px);
            cursor: pointer;
            &.connect-audio {
              background-image: url("./assets/audio.png");
              margin-right: pxrem(20px);
            }
            &.connect-video {
              background-image: url("./assets/video.png");
            }
          }
          .list-body {
            padding: pxrem(27.5px) pxrem(30px) pxrem(31.5px);
          }
          .border-line{
            width: 100%;
            height: pxrem(5px);
            background: url('./assets/line.png') no-repeat bottom;
            background-size: 100%;
          }
        }
      }
      .no-data{
        width: 100%;
        height: pxrem(885px);
        background: #0B2152;
        font-size: pxrem(35px);
        color: #ebebeb;
      }
    }
  }
}
.common01-ft70 {
  font-size: pxrem(35px);
}
.common01-ft58 {
  font-size: pxrem(29px);
}
.common01-ft38 {
  font-size: pxrem(19px);
}
</style>
