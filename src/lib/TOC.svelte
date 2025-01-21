<script>
  // @ts-nocheck

  /**
   * @type {Array<object>}
   */
  export let toc;
</script>

<details class="dashed mt-4">
  <summary>Table of Contents</summary>
  <div>
    <ol class="list-decimal m-4">
      {#each toc as link}
        <li>
          <a href={link.link}>{link.name}</a>
          {#if link.children}
          <ol>
            {#each link.children as link2}
              <li><a href={link2.link}>{link2.name}</a></li>
            {/each}
          </ol>
          {/if}
        </li>
      {/each}
    </ol>
  </div>
</details>
