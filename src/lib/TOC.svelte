<script>
  // @ts-nocheck

  /**
   * @type {Array<object>}
   */
  export let toc;
</script>

<details>
  <summary>Table of Contents</summary>
  <div>
    <ol>
      {#each toc as link}
        <li>
          <a href={link.link}>{link.name}</a>
          <ol>
            {#each link.children as link2}
              <li><a href={link2.link}>{link2.name}</a></li>
            {/each}
          </ol>
        </li>
      {/each}
    </ol>
  </div>
</details>
