import { ListNode } from './$classes.js'

/**
 * No 1:
 * 给定一个整数数组和一个目标整数，
 * 返回两个数字索引，
 * 这两个索引指向的数组子集相加等于目标整数
 * @param { number[] } nums 整数数组
 * @param { number } target 目标整数
 * @return { [number, number] } 数字索引
 */
export const twoSum = function(nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
    if (map.has(complement)) {
      return [map.get(complement), i]
    }
    map.set(nums[i], i)
  }
  throw 'No two sum solution'
}

/**
 * No 2:
 * 您将获得两个非空链接列表，
 * 它们表示两个非负整数。
 * 数字以相反的顺序存储，
 * 并且它们的每个节点都包含一个数字。
 * 将两个数字相加，
 * 然后将总和作为链表返回
 * @param { import('./$classes').ListNode } l1 非空非负整数链接列表（-1 < x < 10）
 * @param { import('./$classes').ListNode } l2 非空非负整数链接列表（-1 < x < 10）
 * @return { import('./$classes').ListNode } 非空非负整数链接列表（-1 < x < 10）
 */
export const addTwoNumbers = function(l1, l2) {
  const resultHead = new ListNode()
  let p = l1, q = l2
  let current = resultHead
  let sum = 0
  while (p || q) {
    if (p) {
      sum += p.val
      p = p.next
    }
    if (q) {
      sum += q.val
      q = q.next
    }
    current.next = new ListNode(sum % 10)
    current = current.next
    sum = sum > 9 ? 1 : 0
  }
  if (sum) { // === 1
    current.next = new ListNode(sum)
  }
  return resultHead.next
}

/**
 * No 4:
 * 给定两个分别大小为m和n的排序数组nums1和nums2，
 * 返回两个排序数组的中位数。
 * @param { number[] } nums1 排序数组（升序）
 * @param { number[] } nums2 排序数组（升序）
 * @return { number } 中位数
 */
export const findMedianSortedArrays = function(nums1, nums2) {
  //#region sth. same to nums1.concat(nums2).sort((i, j) => i - j)

  // const arr = []
  // let i = 0, j = 0
  // while (i < nums1.length && j < nums2.length) {
  //   nums1[i] < nums2[j]
  //     ? arr.push(nums1[i++])
  //     : arr.push(nums2[j++])
  // }
  // i < nums1.length && arr.push(...nums1.slice(i))
  // j < nums2.length && arr.push(...nums2.slice(j))

  //#endregion
  const arr = nums1.concat(nums2).sort((i, j) => i - j)

  const mid = arr.length / 2
  if (arr.length % 2 === 0) {
    return (arr[mid - 1] + arr[mid]) / 2
  } else {
    return arr[Math.floor(mid)]
  }
}

/**
 * No 5:
 * 给定字符串s，
 * 返回s中最长的回文子字符串
 * @param { string } s 给定字符串
 * @return { string } 最长的回文子字符串
 */
export const longestPalindrome = function(s) {
  if (!s) {
    return ''
  }
  let start = 0, end = 0
  for (let i = 0; i < s.length; i++) {
    const len1 = expandAroundCenter(s, i, i)
    const len2 = expandAroundCenter(s, i, i + 1)
    const len = Math.max(len1, len2)
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2)
      end = i + Math.floor(len / 2)
    }
  }
  return s.substring(start, end + 1)

  /**
   *
   * @param { string } s
   * @param { number } left
   * @param { number } right
   */
  function expandAroundCenter (s, left, right) {
    let l = left, r = right
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--
      r++
    }
    return r - l - 1
  }
}
