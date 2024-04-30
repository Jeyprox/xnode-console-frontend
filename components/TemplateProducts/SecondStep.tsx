/* eslint-disable dot-notation */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
'use client'
/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from 'react'
import { getAPI, getDatasets } from '@/utils/data'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TemplatesProducts } from '@/types/dataProvider'
import { SmileySad } from 'phosphor-react'
import Filter from '@/components/Filter'
import { TextField, Autocomplete } from '@mui/material'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import ProductsList from '../ProductsList'
import Dropdown, { ValueObject } from './Dropdown'
import { AccountContext } from '@/contexts/AccountContext'

const Configuration = () => {
  const [templates, setTemplates] = useState<TemplatesProducts[]>([])
  const [page, setPage] = useState<number>(1)
  const [searchInput, setSearchInput] = useState<string>()
  const [includedServices, setIncludeServices] = useState<any>({})
  const [addPythiaToDeployment, setAddPythiaToDeployment] =
    useState<boolean>(false)

  const { templateSelected, setIndexerDeployerStep } =
    useContext(AccountContext)

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  return (
    <section className="relative z-10 pt-[30px] pb-[200px] lg:pt-0">
      <div className="mx-auto max-w-[1380px] px-[20px]  text-[14px] font-normal text-[#000]">
        <div className="flex justify-between gap-x-[95px]">
          <div className="w-full">
            <div className="mb-[12.5px] text-[48px] font-semibold -tracking-[1.9px]">
              Choose your configuration
            </div>
            <div className="pt-[40.5px]">
              <div className="">
                <div className="flex h-[40px]">
                  <div className="mr-[2px] w-[61px] rounded-l-[8px] bg-[#000]"></div>
                  <div className="w-[250px] bg-[#0059ff]"></div>
                  <div className="flex w-[259px] items-center justify-center rounded-r-[8px] bg-[#e5eefc] text-[16px] font-medium">
                    available to rent and get paid
                  </div>
                </div>
                <div className="mt-[13.63px] flex w-fit justify-between gap-x-[15px]">
                  <div className="flex items-center gap-x-[8px]">
                    <div className="h-[13px] w-[13px] rounded-full bg-[#000]"></div>
                    <div className="text-[16px] font-normal">
                      Openmesh core (1.96 TB)
                    </div>
                  </div>
                  <div className="flex items-center gap-x-[8px]">
                    <div className="h-[13px] w-[13px] rounded-full bg-[#0059ff]"></div>
                    <div className="text-[16px] font-normal">
                      Your services (33 GB){' '}
                    </div>
                  </div>
                  <div className="flex items-center gap-x-[8px]">
                    <div className="h-[13px] w-[13px] rounded-full bg-[#e5eefc]"></div>
                    <div className="text-[16px] font-normal">
                      Free (220.9 MB){' '}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[38px] w-full max-w-[808px]">
                <div className="text-[18px] font-semibold !leading-[36px]">
                  Review and build your solution
                </div>
                <div className="mt-[8px] flex bg-[#e5eefc] px-[24px] py-[12px] text-[16px] font-normal !leading-[24px]">
                  <div className="w-full max-w-[283px]">Steps</div>
                  <div className="w-full max-w-[406px]">Description</div>
                  <div>Edit</div>
                </div>
                <div className="mt-[8px] flex rounded-[12px] bg-[#fff] px-[24px] py-[36px] text-[16px] font-semibold !leading-[24px]">
                  <div className="w-full max-w-[283px] text-[#0059ff]">
                    1. Select cloud provider
                  </div>
                  <div className="w-full max-w-[406px]">
                    {templateSelected?.providerName}
                  </div>
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                        ? process.env.NEXT_PUBLIC_BASE_PATH
                        : ''
                    }/images/template/arrow-right-2.svg`}
                    alt="image"
                    className="cursor-pointer"
                  />
                </div>
                <div className="mt-[8px] flex rounded-[12px] bg-[#fafafa] px-[24px] py-[36px] text-[16px] font-semibold !leading-[24px]">
                  <div className="w-full max-w-[283px] text-[#0059ff]">
                    2. Select service region
                  </div>
                  <div className="w-full max-w-[406px]">
                    {templateSelected?.location}
                  </div>
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                        ? process.env.NEXT_PUBLIC_BASE_PATH
                        : ''
                    }/images/template/arrow-right-2.svg`}
                    alt="image"
                    className="cursor-pointer"
                  />
                </div>
                <div className="mt-[8px] flex rounded-[12px] bg-[#fff] px-[24px] py-[36px] text-[16px] font-semibold !leading-[24px]">
                  <div className="w-full max-w-[283px] text-[#0059ff]">
                    3. Select latency preference
                  </div>
                  <div className="w-full max-w-[406px]">
                    {templateSelected?.availability}
                  </div>
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                        ? process.env.NEXT_PUBLIC_BASE_PATH
                        : ''
                    }/images/template/arrow-right-2.svg`}
                    alt="image"
                    className="cursor-pointer"
                  />
                </div>
                <div className="mt-[8px] rounded-[12px] bg-[#fafafa] px-[24px] py-[36px] text-[16px] font-semibold !leading-[24px]">
                  <div className="flex">
                    <div className="w-full max-w-[283px] text-[#0059ff]">
                      4. Usecase
                    </div>
                    <div className="w-full max-w-[406px]">
                      Building a decentralized data infrastructure
                    </div>
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                          ? process.env.NEXT_PUBLIC_BASE_PATH
                          : ''
                      }/images/template/arrow-right-2.svg`}
                      alt="image"
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="pl-[25px] text-[14px] font-normal text-[#ABABAB]">
                    Included Services
                  </div>
                  <div className="mt-[11px] flex gap-x-[1px] pl-[72px]">
                    <div className="h-[346px] w-[1px] bg-[#C3C1C1]"></div>
                    <div className="w-full">
                      <div className="mt-[22px] flex items-start">
                        <img
                          src={`${
                            process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                              ? process.env.NEXT_PUBLIC_BASE_PATH
                              : ''
                          }/images/template/arrow-end-circle.svg`}
                          alt="image"
                          className="mr-[10px] pt-[12px]"
                        />
                        <div className="w-full max-w-[590px]">
                          <div className="text-[16px] font-semibold text-[#313131]">
                            Kubernetes
                          </div>
                          <div className="mt-[3px] text-[12px] font-normal text-[#505050]">
                            Automating deployment, scaling, and management of
                            containerized applications
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            const obj = { ...includedServices }
                            obj['kubernetes'] = !obj['kubernetes']
                            setIncludeServices(obj)
                          }}
                          className={`flex h-[16px] w-[16px] cursor-pointer rounded-[5px]  ${
                            includedServices?.kubernetes
                              ? 'bg-[#0059ff]'
                              : 'bg-[#929292]'
                          }`}
                        >
                          <img
                            src={`${
                              process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                                ? process.env.NEXT_PUBLIC_BASE_PATH
                                : ''
                            }/images/template/check-white.svg`}
                            alt="image"
                            className="mx-auto my-auto"
                          />
                        </div>
                      </div>
                      <div className="mt-[26px] flex items-start">
                        <img
                          src={`${
                            process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                              ? process.env.NEXT_PUBLIC_BASE_PATH
                              : ''
                          }/images/template/arrow-end-circle.svg`}
                          alt="image"
                          className="mr-[10px] pt-[12px]"
                        />
                        <div className="w-full max-w-[590px]">
                          <div className="text-[16px] font-semibold text-[#313131]">
                            Openmesh Consensus{' '}
                          </div>
                          <div className="mt-[3px] text-[12px] font-normal text-[#505050]">
                            Automating deployment, scaling, and management of
                            containerized applications
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            const obj = { ...includedServices }
                            obj['openmeshConsensus'] = !obj['openmeshConsensus']
                            setIncludeServices(obj)
                          }}
                          className={`flex h-[16px] w-[16px] cursor-pointer rounded-[5px]  ${
                            includedServices?.openmeshConsensus
                              ? 'bg-[#0059ff]'
                              : 'bg-[#929292]'
                          }`}
                        >
                          <img
                            src={`${
                              process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                                ? process.env.NEXT_PUBLIC_BASE_PATH
                                : ''
                            }/images/template/check-white.svg`}
                            alt="image"
                            className="mx-auto my-auto"
                          />
                        </div>
                      </div>
                      <div className="mt-[26px] flex items-start">
                        <img
                          src={`${
                            process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                              ? process.env.NEXT_PUBLIC_BASE_PATH
                              : ''
                          }/images/template/arrow-end-circle.svg`}
                          alt="image"
                          className="mr-[10px] pt-[12px]"
                        />
                        <div className="w-full max-w-[590px]">
                          <div className="text-[16px] font-semibold text-[#313131]">
                            BitTorrent Protocol Client{' '}
                          </div>
                          <div className="mt-[3px] text-[12px] font-normal text-[#505050]">
                            Automating deployment, scaling, and management of
                            containerized applications
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            const obj = { ...includedServices }
                            obj['bittorrent'] = !obj['bittorrent']
                            setIncludeServices(obj)
                          }}
                          className={`flex h-[16px] w-[16px] cursor-pointer rounded-[5px]  ${
                            includedServices?.bittorrent
                              ? 'bg-[#0059ff]'
                              : 'bg-[#929292]'
                          }`}
                        >
                          <img
                            src={`${
                              process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                                ? process.env.NEXT_PUBLIC_BASE_PATH
                                : ''
                            }/images/template/check-white.svg`}
                            alt="image"
                            className="mx-auto my-auto"
                          />
                        </div>
                      </div>
                      <div className="mt-[26px] flex items-start">
                        <img
                          src={`${
                            process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                              ? process.env.NEXT_PUBLIC_BASE_PATH
                              : ''
                          }/images/template/arrow-end-circle.svg`}
                          alt="image"
                          className="mr-[10px] pt-[12px]"
                        />
                        <div className="w-full max-w-[590px]">
                          <div className="text-[16px] font-semibold text-[#313131]">
                            Phytia Pro{' '}
                          </div>
                          <div className="mt-[3px] text-[12px] font-normal text-[#505050]">
                            Automating deployment, scaling, and management of
                            containerized applications
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            const obj = { ...includedServices }
                            obj['phytiaPro'] = !obj['phytiaPro']
                            setIncludeServices(obj)
                          }}
                          className={`flex h-[16px] w-[16px] cursor-pointer rounded-[5px]  ${
                            includedServices?.phytiaPro
                              ? 'bg-[#0059ff]'
                              : 'bg-[#929292]'
                          }`}
                        >
                          <img
                            src={`${
                              process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                                ? process.env.NEXT_PUBLIC_BASE_PATH
                                : ''
                            }/images/template/check-white.svg`}
                            alt="image"
                            className="mx-auto my-auto"
                          />
                        </div>
                      </div>
                      <div className="mt-[26px] flex items-start">
                        <img
                          src={`${
                            process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                              ? process.env.NEXT_PUBLIC_BASE_PATH
                              : ''
                          }/images/template/arrow-end-circle.svg`}
                          alt="image"
                          className="mr-[10px] pt-[12px]"
                        />
                        <div className="w-full max-w-[590px]">
                          <div className="text-[16px] font-semibold text-[#313131]">
                            APIs & Connectivity{' '}
                          </div>
                          <div className="mt-[3px] text-[12px] font-normal text-[#505050]">
                            Automating deployment, scaling, and management of
                            containerized applications
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            const obj = { ...includedServices }
                            obj['apiConnectivity'] = !obj['apiConnectivity']
                            setIncludeServices(obj)
                          }}
                          className={`flex h-[16px] w-[16px] cursor-pointer rounded-[5px]  ${
                            includedServices?.apiConnectivity
                              ? 'bg-[#0059ff]'
                              : 'bg-[#929292]'
                          }`}
                        >
                          <img
                            src={`${
                              process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                                ? process.env.NEXT_PUBLIC_BASE_PATH
                                : ''
                            }/images/template/check-white.svg`}
                            alt="image"
                            className="mx-auto my-auto"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[58px]">
                <div className="text-[18px] font-medium">
                  Openmesh Add-on Apps{' '}
                </div>
                <div className="mt-[9px] text-[16px] font-medium text-[#959595]">
                  Available applications that you can add to your deployment
                  (optional)
                </div>
                <div className="mt-[20px] flex w-fit rounded-[8px] border-[1px] border-[#cfd3d8] p-[30px] shadow-[0_5px_12px_0px_rgba(0,0,0,0.10)]">
                  <div className="mr-[25px] text-center">
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                          ? process.env.NEXT_PUBLIC_BASE_PATH
                          : ''
                      }/images/template/pythia.svg`}
                      alt="image"
                      className=""
                    />
                    <div className="mt-[7px] text-[14px] font-semibold text-[#12AD50]">
                      Free
                    </div>
                  </div>
                  <div className="mr-[42px]">
                    <div className="flex gap-x-[10px]">
                      <div className="text-[18px] font-bold">Pythia Search</div>
                      <div className="rounded-[5px] border-[1px] border-[#FFC946] bg-[#FFE9B2] py-[5px] px-[7px] text-[10px] font-semibold">
                        POPULAR ADD-ON
                      </div>
                    </div>
                    <div className="mt-[15px] max-w-[435px] text-[14px] font-normal text-[#4d4d4d]">
                      A single endpoint for all crypto & web3 data, accessible
                      to anyone, anywhere, always free. No license, no
                      registration, no setup fees{' '}
                    </div>
                  </div>
                  <div className="flex gap-x-[15px]">
                    <div className="text-[16px] font-medium text-[#4d4d4d]">
                      Add to deployment
                    </div>
                    <div
                      onClick={() => {
                        setAddPythiaToDeployment(!addPythiaToDeployment)
                      }}
                      className={`h-[20px] w-[20px] ${
                        addPythiaToDeployment ? 'bg-[#0059ff]' : 'bg-[#fff]'
                      } cursor-pointer rounded-[5px] border-[1px] border-[#cfd3d8]`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-fit rounded-[8px] border-[1px] border-[#cfd3d8] p-[32px] shadow-[0_5px_12px_0px_rgba(0,0,0,0.10)]">
            <div className="flex items-center justify-between">
              <div className=" text-[24px] font-bold !leading-[40px]">
                Your progress
              </div>
              <img
                src={`${
                  process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                    ? process.env.NEXT_PUBLIC_BASE_PATH
                    : ''
                }/images/template/close-gray.svg`}
                alt="image"
                className="my-auto w-[24px] cursor-pointer pt-[2px]"
              />
            </div>
            <div className="mt-[32px] grid gap-y-[32px]">
              <div className="flex items-center gap-x-[20px]">
                <div
                  className={`flex h-[48px] w-[48px] rounded-full  ${
                    templateSelected ? 'bg-[#0059ff]' : 'bg-[#e5eefc]'
                  }`}
                >
                  {templateSelected && (
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                          ? process.env.NEXT_PUBLIC_BASE_PATH
                          : ''
                      }/images/template/check.svg`}
                      alt="image"
                      className="mx-auto my-auto"
                    />
                  )}
                </div>
                <div className="text-[18px] font-semibold">
                  Select a template
                </div>
              </div>
              <div className="flex items-center gap-x-[20px]">
                <div
                  className={`flex h-[48px] w-[48px] rounded-full  ${
                    templateSelected ? 'bg-[#0059ff]' : 'bg-[#e5eefc]'
                  }`}
                >
                  {templateSelected && (
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD'
                          ? process.env.NEXT_PUBLIC_BASE_PATH
                          : ''
                      }/images/template/check.svg`}
                      alt="image"
                      className="mx-auto my-auto"
                    />
                  )}
                </div>{' '}
                <div className="text-[18px] font-semibold">
                  Select a provider{' '}
                </div>
              </div>
              <div className="flex items-center gap-x-[20px]">
                <div className="h-[48px] w-[48px] rounded-full bg-[#e5eefc]"></div>
                <div className="text-[18px] font-semibold">
                  <div>Choose your configuration </div>
                </div>
              </div>
            </div>
            <div className="mt-[17px]">
              <div className="ml-[68px]">
                <div className="border-b-[1px] border-[#fafafa] pb-[5px]">
                  <div className="text-[14px] font-medium text-[#959595]">
                    Service
                  </div>
                  <div className="mt-[5px] text-[16px] font-bold text-[#4d4d4d]">
                    Xnode
                  </div>
                </div>
                <div className="mt-[10px] border-b-[1px] border-[#fafafa] pb-[5px]">
                  <div className="text-[14px] font-medium text-[#959595]">
                    Cloud
                  </div>
                  <div className="mt-[5px] text-[16px] font-bold text-[#4d4d4d]">
                    {templateSelected?.providerName}
                  </div>
                </div>
                <div className="mt-[10px] border-b-[1px] border-[#fafafa] pb-[5px]">
                  <div className="text-[14px] font-medium text-[#959595]">
                    Region
                  </div>
                  <div className="mt-[5px] text-[16px] font-bold text-[#4d4d4d]">
                    {templateSelected?.location}
                  </div>
                </div>
                <div className="mt-[10px] border-b-[1px] border-[#fafafa] pb-[5px]">
                  <div className="text-[14px] font-medium text-[#959595]">
                    Latency
                  </div>
                  <div className="mt-[5px] text-[16px] font-bold text-[#4d4d4d]">
                    {templateSelected?.availability}
                  </div>
                </div>
                <div className="mt-[10px] border-b-[1px] border-[#fafafa] pb-[5px]">
                  <div className="text-[14px] font-medium text-[#959595]">
                    Database
                  </div>
                  <div className="mt-[5px] text-[16px] font-bold text-[#4d4d4d]">
                    PostgreSQL{' '}
                  </div>
                </div>
                <div className="mt-[10px] border-b-[1px] border-[#fafafa] pb-[5px]">
                  <div className="text-[14px] font-medium text-[#959595]">
                    Data sources
                  </div>
                  <div className="mt-[5px] text-[16px] font-bold text-[#4d4d4d]">
                    Off-chain data
                  </div>
                  <ul>
                    <li className="ml-[17px] list-disc text-[14px] font-medium text-[#4d4d4d]">
                      Apollox{' '}
                    </li>
                    <li className="ml-[17px] list-disc text-[14px] font-medium text-[#4d4d4d]">
                      Binance{' '}
                    </li>
                  </ul>
                  <div className="text-[16px] font-bold text-[#4d4d4d]">
                    On-chain data{' '}
                  </div>
                  <ul>
                    <li className="ml-[17px] list-disc text-[14px] font-medium text-[#4d4d4d]">
                      Ethereum{' '}
                    </li>
                  </ul>
                </div>
                <div className="mt-[10px] border-b-[1px] border-[#fafafa] pb-[5px]">
                  <div className="text-[14px] font-medium text-[#959595]">
                    Add-ons
                  </div>
                  <div className="mt-[5px] text-[16px] font-bold text-[#4d4d4d]">
                    Unified API{' '}
                  </div>
                </div>
                <div className="mt-[25px]">
                  <div className="text-[18px] font-medium">No. of servers</div>
                  <div className="text-[18px] font-bold text-[#0059ff]">
                    2 x small servers
                  </div>
                </div>
                <div className="mt-[18px]">
                  <div className="text-[18px] font-medium">
                    Estimated monthly price*
                  </div>
                  <div className="text-[18px] font-bold text-[#0059ff]">
                    $42 / month{' '}
                  </div>
                </div>
              </div>

              <div
                onClick={() => {
                  setIndexerDeployerStep(2)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="mt-[30px] cursor-pointer  whitespace-nowrap rounded-[12px] bg-[#0059ff] px-[50px] py-[13px] text-[16px] font-bold !leading-[150%] text-[#fff] hover:bg-[#014cd7]"
              >
                Create service and deploy
              </div>
              <div className="mt-[34px] flex items-center gap-x-[20px]">
                <div className="h-[48px] w-[48px] rounded-full bg-[#e5eefc]"></div>
                <div className="text-[18px] font-semibold text-[#959595]">
                  Performing connection{' '}
                </div>
              </div>
              <div className="mt-[34px] flex items-center gap-x-[20px]">
                <div className="h-[48px] w-[48px] rounded-full bg-[#e5eefc]"></div>
                <div className="text-[18px] font-semibold text-[#959595]">
                  Service deployed{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Configuration
